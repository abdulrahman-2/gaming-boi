"use client";

import { useWishlist } from "@/context/wishlistContext";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Button } from "../ui/button";

const AddToWishlist = ({
  gameId,
  bigScreen,
}: {
  gameId: string;
  bigScreen?: boolean;
}) => {
  const { handleAddToWishlist, wishlist } = useWishlist();
  const isInWishlist = wishlist.includes(gameId);
  return bigScreen ? (
    <Button
      onClick={() => handleAddToWishlist(gameId)}
      aria-label="Toggle Favorite"
      className={`mt-5 ${
        isInWishlist
          ? "text-white bg-red-500 hover:bg-red-400 duration-200"
          : "text-gray-900 bg-white"
      }`}
    >
      {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  ) : (
    <MdOutlineFavoriteBorder
      onClick={() => handleAddToWishlist(gameId)}
      size={20}
      aria-label="Toggle Favorite"
      className={`${
        isInWishlist ? "text-white bg-red-500" : "text-gray-900 bg-white"
      } cursor-pointer w-7 h-7 rounded-full p-[5px]`}
    />
  );
};

export default AddToWishlist;
