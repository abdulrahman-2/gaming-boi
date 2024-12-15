"use client";

import { useWishlist } from "@/context/wishlistContext";
import { useGetGamesWithIds } from "@/lib/queryFunctions";
import GameSkeleton from "../GameSkeleton";
import WishlistCard from "./WishlistCard";
import Empty from "../defaults/Empty";

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const { games, isLoading } = useGetGamesWithIds(wishlist);
  return (
    <div className=" mt-10 flex flex-col gap-4">
      <h1 className="text-white text-2xl md:text-3xl font-bold">
        My WishList ❤️
      </h1>
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <GameSkeleton number={wishlist.length} />
        ) : (games ?? []).length > 0 ? (
          games?.map((game: any, i) => (
            <WishlistCard
              key={i}
              wishlist={true}
              game={{
                ...game.data,
                short_screenshots: game.screenshots,
              }}
            />
          ))
        ) : (
          <Empty
            message="You have not added anything to your wishlist yet !"
            link="/games"
            linkText="Browse More Games"
          />
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
