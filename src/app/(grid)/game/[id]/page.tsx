import ReviewForm from "@/components/forms/ReviewForm";
import Review from "@/components/Review";
import GamesSlider from "@/components/sections/GamesSlider";
import SwiperCards from "@/components/SwiperCards";
import AddToWishlist from "@/components/wishlist/AddToWishlist";
import { getReviews} from "@/lib/actions";
import { getGame } from "@/lib/api";
import { Game, ImageType } from "@/types";
import Image from "next/image";
import React from "react";

const GameDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const allReviews = await getReviews(id);

  try {
    const game = await getGame(id);
    if (!game) {
      return <div className="text-white">Game not found</div>;
    }
    const {
      screenshots,
      data,
      similar,
    }: {
      screenshots: { results: ImageType[] };
      data: Game;
      similar: { results: Game[] };
    } = game;

    const screenshotItems = [
      ...screenshots.results.map((screenshot) => screenshot.image),
      data.background_image,
      data.background_image_additional,
    ].filter(Boolean);

    return (
      <div className="mt-10">
        <div className="col-span-4 flex flex-col gap-2">
          <h1 className="text-2xl text-white">{data.name}</h1>
          <div>Rating count: {data.ratings_count}</div>

          <SwiperCards
            slidesPerView={1}
            className="h-full"
            items={screenshotItems.map((src) => ({
              card: (
                <div className="rounded-xl overflow-hidden h-[36rem] w-full relative">
                  <Image
                    src={src}
                    alt={`${data.name} screenshot`}
                    fill
                    className="object-cover"
                  />
                </div>
              ),
              src,
            }))}
            paginationImage
          />

          <p className="mt-10 col-span-2">{data.description_raw}</p>

          <AddToWishlist gameId={id} bigScreen />
        </div>

        {/* reviews */}
        <div className="mt-10">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-2xl lg:text-4xl font-bold">
              Reviews
            </h1>
            <span className="text-gray-400 text-xl lg:text-2xl">{`(${allReviews.reviews?.length || 0})`}</span>
          </div>
          {allReviews.reviews && allReviews.reviews.length > 0 ? (
            allReviews.reviews.map((review) => {
              const formattedDate = new Date(
                review.createdAt
              ).toLocaleDateString();

              return (
                <Review
                  key={review._id}
                  name={review.userId.name}
                  image={review.userId.avatar.secure_url}
                  reviewText={review.reviewText}
                  date={formattedDate}
                  rating={review.rating}
                  likes={review.likes}
                />
              );
            })
          ) : (
            <div className="text-white">No reviews yet</div>
          )}

          <ReviewForm gameId={id} />
        </div>

        {similar.results.length > 0 && (
          <GamesSlider title="Similar Games" games={similar.results} />
        )}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch game details:", error);
    return (
      <div className="text-white">
        An error occurred while fetching game details.
      </div>
    );
  }
};

export default GameDetailsPage;
