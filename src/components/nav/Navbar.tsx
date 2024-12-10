"use client";

import React from "react";
import Search from "../Search";
import { Button } from "../ui/button";
import { IoGameController } from "react-icons/io5";
import Link from "next/link";
import { useGetUser } from "@/lib/queryFunctions";
import User from "../User";
import CustomSkeleton from "../CustomSkeleton";

const Navbar = () => {
  const { user, isLoading } = useGetUser();
  return (
    <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-[15px] md:gap-6">
      <div className="w-full md:flex-1">
        <Search />
      </div>
      <div className="w-full md:w-auto flex items-center justify-between gap-2">
        <IoGameController size={40} className="md:hidden text-gray-50" />
        {isLoading ? (
          <CustomSkeleton circle />
        ) : user?.data ? (
          <User user={user.data} />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button className="font-semibold">Login</Button>
            </Link>
            <Link href="/signUp">
              <Button className="font-semibold">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
