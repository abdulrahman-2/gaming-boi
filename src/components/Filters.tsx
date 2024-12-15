"use client";

import { useState } from "react";
import GridContainer from "./defaults/GridContainer";
import { useGetGames } from "@/lib/queryFunctions";
import Empty from "./defaults/Empty";
import GameSkeleton from "./GameSkeleton";
import WishlistCard from "./wishlist/WishlistCard";
import { Game } from "@/types";
import { PaginationCustom } from "./PaginationCustom";

const Filters = ({ genres }: { genres: any[] }) => {
  const [page, setPage] = useState(1);
  const [activeGenres, setActiveGenres] = useState<number[]>([]);
  const { games, isLoading } = useGetGames({
    page,
    filters:
      activeGenres.length > 0
        ? [{ filterName: "genres", option: activeGenres?.join(",") }]
        : [],
  });

  const handleActive = (genreId: number) => {
    if (activeGenres.includes(genreId)) {
      setActiveGenres(activeGenres.filter((id) => id !== genreId));
    } else {
      setActiveGenres([...activeGenres, genreId]);
    }
  };

  const totalPages = Math.ceil(games?.data.count / 21);
  return (
    <GridContainer className="gap-5 relative" cols={12}>
      <div className="lg:sticky lg:h-screen inset-0 col-span-full lg:col-span-3">
        <div className="flex flex-row flex-wrap lg:flex-col gap-3 bg-gray-800 py-4 px-8 rounded-2xl ">
          {genres.map((genre: any, i: number) => (
            <button
              onClick={() => {
                handleActive(genre.id);
              }}
              className={`${
                activeGenres.includes(genre.id) ? "bg-rose-400" : ""
              } text-base rounded-xl`}
              key={i}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      <div className="gap-3 grid grid-cols-2 lg:grid-cols-3 col-span-full lg:col-span-9">
        {isLoading ? (
          <GameSkeleton number={21} />
        ) : games?.data.results.length > 0 ? (
          games?.data.results.map((game: Game) => (
            <WishlistCard wishlist key={game.id} game={game} />
          ))
        ) : (
          <Empty message="Sorry, no games found in this page" />
        )}
      </div>

      <PaginationCustom setPage={setPage} page={page} count={totalPages} />
    </GridContainer>
  );
};

export default Filters;
