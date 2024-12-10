import mongoose from "mongoose";

const gameReviewSchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
});

export const GameReview =
  mongoose.models.GameReview || mongoose.model("GameReview", gameReviewSchema);
