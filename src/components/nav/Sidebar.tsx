"use client";

import { FaCartShopping } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import NavLink from "./NavLink";
import { LinkType } from "@/types/types";
import Logo from "../defaults/Logo";

const links = [
  {
    label: "Home",
    href: "/",
    icon: <GoHomeFill size={22} />,
  },
  {
    label: "Games",
    href: "/games",
    icon: <MdDashboard size={22} />,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: <FaCartShopping size={22} />,
  },
  {
    label: "wishlist",
    href: "/wishlist",
    icon: <IoMdHeart size={22} />,
  },
];

const Sidebar = () => {
  return (
    <div className="hidden md:block md:col-span-1 lg:col-span-2">
      <div className="py-7 px-5 xl:px-10 flex flex-col items-start md:items-center lg:items-start h-screen sticky inset-0 bg-black/20 shadow-lg text-gray-50">
        <Logo />
        <div className="space-y-4 lg:space-y-5">
          {links.map((link: LinkType) => (
            <NavLink link={link} key={link.href} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
