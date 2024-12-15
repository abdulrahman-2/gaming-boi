import { connectDB } from "@/lib/mongodb";
import GameReview from "@/models/review";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        
        // Drop all reviews
        await GameReview.deleteMany({});
        
        // Drop the index
        await GameReview.collection.dropIndexes();
        
        // Recreate the index
        await GameReview.collection.createIndex(
            { userId: 1, gameId: 1 },
            { unique: true, background: true, name: 'unique_user_game_review' }
        );

        return NextResponse.json({ 
            success: true, 
            message: "Reviews cleared and indexes rebuilt" 
        });
    } catch (error: any) {
        console.error('Debug route error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}
