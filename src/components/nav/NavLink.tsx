import { LinkType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link }: { link: LinkType }) => {
  const pathName = usePathname();
  const isActive = pathName === link.href;
  return (
    <Link
      key={link.label}
      href={link.href}
      className={`flex items-center gap-2 p-2 rounded-lg hover:text-rose-500 transition duration-300 ${
        isActive && "text-rose-500"
      }`}
    >
      <span>{link.icon}</span>
      <span className="text-base xl:text-lg block md:hidden lg:block">
        {link.label}
      </span>
    </Link>
  );
};

export default NavLink;
