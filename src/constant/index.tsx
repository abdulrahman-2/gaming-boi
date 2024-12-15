import { GoHomeFill } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

// Navigation links array
export const links = [
  {
    label: "Home",
    href: "/",
    icon: <GoHomeFill size={22} aria-label="Home Icon" />,
  },
  {
    label: "Games",
    href: "/games",
    icon: <MdDashboard size={22} aria-label="Games Icon" />,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: <IoMdHeart size={22} aria-label="Wishlist Icon" />,
  },
];
