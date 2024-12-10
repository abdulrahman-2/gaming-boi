import Hero from "@/components/sections/Hero";
import SwiperCards from "@/components/SwiperCards";
import { searchGames } from "@/lib/api";
import { Game } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const { data } = await searchGames("", 1, [], 10);

  const games: Game[] = data.results;
  return (
    <main className="mt-5 md:mt-7">
      <Hero />

      <div className="mt-10">
        <SwiperCards
          haveBreakpoints
          slidesPerView={1}
          smSlidesPerView={2}
          mdSlidesPerView={3}
          lgSlidesPerView={4}
          className="h-full"
          items={games.map((game: Game) => {
            return {
              card: (
                <Link
                  href={`/game/${game.id}`}
                  className="cursor-pointer group"
                >
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
                  </div>
                  <h1 className="text-white mt-2 text-lg font-semibold line-clamp-1">
                    {game.name}
                  </h1>
                </Link>
              ),
            };
          })}
        />
      </div>
    </main>
  );
};

export default Home;
