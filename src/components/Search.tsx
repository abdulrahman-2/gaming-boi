"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { MdSearch } from "react-icons/md";
import { HiMiniXMark } from "react-icons/hi2";

const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="relative group">
      <Input
        placeholder="Search"
        className="bg-black/20 text-gray-50 placeholder:text-gray-50/50"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
          <div className="flex items-center gap-2">
            {search.length > 0 && (
              <HiMiniXMark
                size={25}
                className="text-gray-50 cursor-pointer"
                onClick={() => setSearch("")}
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
  );
};

export default Search;
