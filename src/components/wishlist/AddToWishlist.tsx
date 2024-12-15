"use client";

import { useWishlist } from "@/context/wishlistContext";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const AddToWishlist = ({ gameId }: { gameId: string }) => {
  const { handleAddToWishlist, wishlist } = useWishlist();
  const isInWishlist = wishlist.includes(gameId);
  return (
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
