import mongoose from "mongoose";

const gameReviewSchema = new mongoose.Schema({
  gameId: { 
    type: String, 
    required: true,
    trim: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  reviewText: { 
    type: String, 
    required: true,
    trim: true,
    minlength: [3, "Review must be at least 3 characters long"],
    maxlength: [500, "Review cannot exceed 500 characters"]
  },
  rating: { 
    type: Number, 
    required: true, 
    min: [1, "Rating must be at least 1"], 
    max: [5, "Rating cannot exceed 5"] 
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: { type: Date, default: Date.now },
});

gameReviewSchema.pre('validate', function(next) {
  if (this.gameId) {
    this.gameId = this.gameId.toString();
  }
  next();
});

gameReviewSchema.index({ 
  userId: 1, 
  gameId: 1 
}, { 
  unique: true,
  background: true,
  name: 'unique_user_game_review'
});

const GameReview = mongoose.models.GameReview || mongoose.model("GameReview", gameReviewSchema);

if (mongoose.connection.readyState === 1) {
  GameReview.createIndexes().catch(console.error);
}

export default GameReview;
