import React from "react";
import Search from "../Search";
import { Button } from "../ui/button";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-[15px] md:gap-6">
      <div className="w-full md:flex-1">
        <Search />
      </div>
      <div className="w-full md:w-auto flex items-center justify-between gap-2">
        <IoMenu size={40} className="md:hidden text-gray-50" />
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button className="font-semibold">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="font-semibold">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
