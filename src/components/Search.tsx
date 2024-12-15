"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { MdSearch } from "react-icons/md";
import { HiMiniXMark } from "react-icons/hi2";
import { useGetGames } from "@/lib/queryFunctions";
import MotionDiv from "./defaults/MotionDiv";
import { AnimatePresence } from "framer-motion";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import ToggleMenu from "./ToggleMenu";

const Search = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { games, isLoading } = useGetGames({
    query: search,
    isDisabled: search === "",
  });

  const [active, setActive] = useState(false);

  const outsideREF = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        outsideREF.current &&
        !outsideREF.current.contains(e.target as Node | null)
      ) {
        setActive(false);
      }
    });
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(query);
    }, 500);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="relative" ref={outsideREF}>
      <div className="flex items-center gap-2 w-full">
        <ToggleMenu />
        <div className="relative group w-full">
          <Input
            value={query}
            onChange={(e) => {
              setActive(true);
              setQuery(e.target.value);
            }}
            placeholder="Search"
            className="bg-black/20 text-gray-50 placeholder:text-gray-50/50"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
            <div className="flex items-center gap-2">
              {search.length > 0 && (
                <HiMiniXMark
                  size={25}
                  className="text-gray-50 cursor-pointer"
                  onClick={() => {
                    setSearch("");
                    setQuery("");
                  }}
                />
              )}
              <MdSearch
                size={25}
                className="text-gray-50 group-hover:text-rose-400 duration-200 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {(games?.data || isLoading) && active && (
          <MotionDiv
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ opacity: 0 }}
            className="absolute w-full top-full z-50 bg-[#222425] rounded-2xl shadow-sm max-h-[40vh] overflow-y-scroll left-0"
          >
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="space-y-2 flex items-start gap-2 px-4 py-2"
                >
                  <Skeleton className="h-20 rounded-2xl w-[40%]" />
                  <div className=" flex flex-col gap-3">
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))
            ) : games?.data.results.length > 0 ? (
              games?.data.results.map((game: any) => (
                <div
                  key={game.id}
                  className="hover:bg-rose-600 duration-200 flex flex-col gap-2 px-4 py-2"
                >
                  <Link
                    href={`/game/${game.id}`}
                    className="flex gap-3 items-start w-full h-full"
                  >
                    <div className="rounded-2xl relative overflow-hidden w-[200px] md:w-[300px] bg-neutral-900 h-28">
                      <Image
                        className="object-cover"
                        src={game.background_image || "/"}
                        alt={game.name}
                        fill
                      />
                    </div>
                    <h1 className="font-semibold text-white">{game.name}</h1>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-white py-4">
                No games found with `{search}` query
              </p>
            )}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
