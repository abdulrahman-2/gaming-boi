"use client";

import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import NavLink from "./NavLink";
import { LinkType } from "@/types";
import Logo from "../defaults/Logo";
import { useGetUser } from "@/lib/queryFunctions";
import CustomSkeleton from "../CustomSkeleton";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { links } from "@/constant";

const Sidebar = () => {
  const { user, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const res = await logout();
    if (res !== undefined && res.success) {
      toast.success(res.success);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } else if (res !== undefined && res.error) {
      toast.error(res.error);
    }
  };
  return (
    <div className="hidden md:block md:col-span-1 lg:col-span-2">
      <div className="py-7 px-5 xl:px-10 flex flex-col items-start md:items-center lg:items-start h-screen sticky inset-0 bg-black/20 shadow-lg text-gray-50">
        <Logo />
        <div className="space-y-4 lg:space-y-5">
          {links.map((link: LinkType) => (
            <NavLink link={link} key={link.href} />
          ))}
        </div>
        <div className="mt-auto">
          {isLoading ? (
            <CustomSkeleton />
          ) : user?.data ? (
            <div className="space-y-4">
              <NavLink
                link={{
                  label: "Settings",
                  href: "/settings",
                  icon: <IoMdSettings size={22} />,
                }}
              />
              <div>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full md:hidden lg:block rounded-full"
                >
                  Logout
                </Button>
                <FiLogOut
                  size={22}
                  className="hidden md:block lg:hidden m-auto"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
