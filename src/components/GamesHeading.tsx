import Link from "next/link";
import React from "react";

const GamesHeading = ({ title, link }: { title: string; link?: string }) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <h1 className="text-white text-2xl lg:text-4xl font-bold">{title}</h1>
      <Link
        href="/games"
        className="text-sm md:text-xl text-rose-400 hover:underline hover:text-rose-400 duration-150"
      >
        {link}
      </Link>
    </div>
  );
};

export default GamesHeading;
