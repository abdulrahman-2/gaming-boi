"use client";

import Spinner from "@/components/defaults/Spinner";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { addToWishList, removeFromWishList } from "@/lib/actions";
import { useGetUser } from "@/lib/queryFunctions";
import { WishlistType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext<WishlistType | null>(null);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);
  const { user, isLoading } = useGetUser();

  const [wishlistLocal, setWishlistLocal] = useLocalStorageState<string[]>(
    "wishlist",
    user?.data ? [...user?.data.wishlist] : []
  );
  const queryClient = useQueryClient();
  const wishlist = user?.data ? user?.data.wishlist : wishlistLocal;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToWishlist = async (gameId: string) => {
    if (!mounted) return;
    const isInWishlist = wishlist.some((wish: any) => wish === gameId);

    if (user?.data) {
      const res = isInWishlist
        ? await removeFromWishList(gameId)
        : await addToWishList(gameId);
      if (res !== undefined && res.success) {
        toast.success(res.success);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } else if (res?.error) {
        toast.error(res.error);
      }
    } else {
      if (isInWishlist) {
        setWishlistLocal(wishlist.filter((wish: any) => wish !== gameId));
        toast.success("Game removed from wishlist");
      } else {
        setWishlistLocal((prev: string[]) => [...prev, gameId]);
        toast.success("Game added to wishlist");
      }
    }
  };

  if (!mounted) return null;
  if (isLoading) return <Spinner size={20} />;
  return (
    <WishlistContext.Provider value={{ wishlist, handleAddToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
};
