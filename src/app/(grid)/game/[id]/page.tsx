import GamesSlider from "@/components/sections/GamesSlider";
import SwiperCards from "@/components/SwiperCards";
import { getGame } from "@/lib/api";
import { Game, ImageType } from "@/types";
import Image from "next/image";
import React from "react";

interface PageProps {
  params: { id: string };
}

const GameDetailsPage = async ({ params }: PageProps) => {
  const { id } = params;

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
        </div>

        <GamesSlider title="Similar Games" games={similar.results} />
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
