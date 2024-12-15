// import mongoose from "mongoose";

// const reviewReplySchema = new mongoose.Schema({
//   reviewId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "GameReview",
//     required: true,
//   },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   content: { type: String, required: true },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   createdAt: { type: Date, default: Date.now },
// });

// // ReviewReply model
// const ReviewReply =
//   mongoose.models.ReviewReply ||
//   mongoose.model("ReviewReply", reviewReplySchema);
// export default ReviewReply;
