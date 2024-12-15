import Image from "next/image";
import Link from "next/link";
import React from "react";
import SwiperCards from "../SwiperCards";
import { Game } from "@/types";
import AddToWishlist from "../wishlist/AddToWishlist";
import GamesHeading from "../GamesHeading";

const GamesSlider = async ({
  games,
  title,
  screenBig,
  slidesPerView = 1,
  smSlidesPerView = 2,
  mdSlidesPerView = 3,
  lgSlidesPerView = 4,
}: {
  games: Game[];
  title: string;
  screenBig?: boolean;
  slidesPerView?: number;
  smSlidesPerView?: number;
  mdSlidesPerView?: number;
  lgSlidesPerView?: number;
}) => {
  return (
    <div className="mt-14">
      <GamesHeading title={title} link="Browse All Games" />
      <SwiperCards
        haveBreakpoints
        slidesPerView={slidesPerView}
        smSlidesPerView={smSlidesPerView}
        mdSlidesPerView={mdSlidesPerView}
        lgSlidesPerView={lgSlidesPerView}
        className="h-full"
        items={games.map((game: Game) => {
          return {
            card: screenBig ? (
              <div className="flex items-center bg-gray-800 rounded-2xl overflow-hidden">
                <div className="flex flex-col w-[60%] px-3">
                  <h1 className="text-2xl md:text-3xl font-semibold pb-3 border-b-2 border-neutral-100 text-white">
                    {game.name}
                  </h1>
                  <p className="text-sm md:text-base text-gray-400 mt-2 line-clamp-4 pt-3">
                    {game.description_raw}
                  </p>
                </div>
                <div className="relative w-[40%] h-72 md:h-80">
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="group">
                <div
                  className="relative w-full h-[420px] rounded-2xl overflow-hidden
                    after:absolute after:inset-0 after:bg-black/50 after:z-10 after:w-0 after:h-full group-hover:after:w-full after:duration-300
                  "
                >
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    fill
                    className="group-hover:scale-125 group-hover:rotate-6 duration-300 object-cover"
                  />
                  <div className="absolute top-2 right-2 z-20">
                    <AddToWishlist gameId={game.id.toString()} />
                  </div>
                </div>
                <Link
                  href={`/game/${game.id}`}
                  className="cursor-pointer group"
                >
                  <h1 className="text-white mt-2 text-lg font-semibold line-clamp-1">
                    {game.name}
                  </h1>
                </Link>
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default GamesSlider;
