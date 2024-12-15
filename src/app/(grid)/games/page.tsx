import Filters from "@/components/Filters";
import React from "react";

const page = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/genres?key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());
  const genres = data.results;
  return (
    <div className=" mt-10 relative flex flex-col gap-5">
      <h1 className="text-white text-2xl md:text-3xl font-bold">
        Games From Genres
      </h1>
      <Filters genres={genres} />
    </div>
  );
};

export default page;
