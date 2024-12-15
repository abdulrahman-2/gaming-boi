"use server";

import User from "@/models/user";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import GameReview from "@/models/review";
import { revalidatePath } from "next/cache";

let decode;
const JWT_EXPIRES = 90 * 60;
const generateToken = ({ id }: { id: string }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: JWT_EXPIRES });
};

export const signUp = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email: data.email });
  if (user) {
    return { error: "An account Already exists" };
  }
  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await User.create({ ...data, password: hashedPassword });
    return { success: "User created successfully" };
  } catch (error: any) {
    console.error(error);
    return { error: "User creation failed", details: error.message };
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    await connectDB();
    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) {
      return { error: "User not found" };
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return { error: "Incorrect password" };
    }
    const userObj = JSON.parse(JSON.stringify(user));
    const token = generateToken({ id: user._id });
    cookies().set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: JWT_EXPIRES,
      path: "/",
    });
    return { success: "Login successful", user: { userObj } };
  } catch (error: any) {
    console.error(error);
    return { error: "Login failed", details: error.message };
  }
};

export const protect = async () => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  if (!token)
    return { error: "you are not authorized to preform this action"! };

  decode = jwt.verify(token, process.env.JWT_SECRET!);
  if (!decode)
    return { error: "you are not authorized to preform this action"! };
  return { decode };
};
export const getUser = async () => {
  try {
    connectDB();
    const { decode } = await protect();
    const user = await User.findById((decode as any).id);
    if (!user)
      return { error: "you are not authorized to preform this action"! };
    const userObj = JSON.parse(JSON.stringify(user));
    return { data: userObj };
  } catch (error: any) {
    return {
      error: "you are not authorized to preform this action"!,
      details: error.message,
    };
  }
};
export const logout = async () => {
  try {
    cookies().delete("token");
    return { success: "Logout successful" };
  } catch (error: any) {
    return { error: "Logout failed", details: error.message };
  }
};

export const removeFromWishList = async (gameId: string) => {
  try {
    await connectDB();
    const { decode } = await protect();
    const user = await User.findById((decode as any).id);
    if (!user)
      return { error: "you are not authorized to preform this action"! };
    user.wishlist = user.wishlist.filter((id: string) => id !== gameId);
    await user.save();
    return { success: "Game removed from wishlist" };
  } catch (error: any) {
    return { error: "Game removal failed", details: error.message };
  }
};

export const addToWishList = async (gameId: string) => {
  try {
    await connectDB();
    const { decode } = await protect();
    const user = await User.findById((decode as any).id);
    if (!user)
      return { error: "you are not authorized to preform this action"! };
    user.wishlist.push(gameId);
    await user.save();
    return { success: "Game added to wishlist" };
  } catch (error: any) {
    return { error: "Game addition failed", details: error.message };
  }
};

// review
export const createReview = async (data: {
  gameId: string;
  reviewText: string;
  rating: string;
}) => {
  try {
    await connectDB();
    const { decode } = await protect();
    if (!decode) {
      return { error: "You are not authorized to perform this action!" };
    }

    const user = await User.findById((decode as any).id);
    if (!user) {
      return { error: "User not found!" };
    }

    // Ensure gameId is a string
    const gameId = data.gameId.toString().trim();
    const userId = user._id;

    console.log('Debug - User:', userId.toString());
    console.log('Debug - GameId:', gameId);

    // Check if user has already reviewed this game
    const existingReview = await GameReview.findOne({
      userId: userId,
      gameId: gameId
    });

    console.log('Debug - Existing Review:', existingReview);

    if (existingReview) {
      console.log('Debug - Found existing review');
      return { error: "You have already reviewed this game" };
    }

    // Convert rating to number and validate
    const rating = Number(data.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return { error: "Rating must be a number between 1 and 5" };
    }

    // Create the review
    const review = new GameReview({
      gameId: gameId,
      userId: userId,
      reviewText: data.reviewText.trim(),
      rating: rating
    });

    console.log('Debug - About to save review:', review);

    // Save the review
    await review.save();

    console.log('Debug - Review saved successfully');

    // Update user's gamesRating array
    await User.findByIdAndUpdate(
      userId,
      { $push: { gamesRating: review._id } }
    );

    // Revalidate the page
    revalidatePath(`/game/${gameId}`);

    return { 
      success: "Review created successfully", 
      review 
    };
  } catch (error: any) {
    console.error("Review creation error:", error);
    
    if (error.code === 11000 || error.message?.includes('duplicate key')) {
      return { error: "You have already reviewed this game" };
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return { error: messages.join(', ') };
    }

    return { 
      error: "Review creation failed", 
      details: error.message 
    };
  }
};

//get reviews
export const getReviews = async (gameId?: string) => {
  try {
    await connectDB();
    let query = {};
    
    if (gameId) {
      query = { gameId };
    }
    
    const reviews = await GameReview.find(query)
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
      
    return { success: "Reviews fetched successfully", reviews };
  } catch (error: any) {
    return { error: "Reviews fetch failed", details: error.message };
  }
};
