"use server";

import User from "@/models/user";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await User.create({ ...data, password: hashedPassword });
    return { success: "User created successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return { error: "User creation failed", details: error.message };
    }
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
      return { error: "Invalid password" };
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return { error: "Login failed", details: error.message };
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: "you are not authorized to preform this action"! };
    }
  }
};
export const logout = async () => {
  try {
    cookies().delete("token");
    return { success: "Logout successful" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: "Logout failed" };
    }
  }
};
