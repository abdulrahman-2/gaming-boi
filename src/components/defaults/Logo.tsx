import Link from "next/link";
import { CgGames } from "react-icons/cg";

const Logo = () => {
  return (
    <Link href="/">
      <h2 className="flex items-center justify-center">
        <span className="text-2xl lg:text-3xl font-bold mb-8 hidden md:block lg:hidden">
          <CgGames className="text-rose-500" size={35} />
        </span>
        <span className="text-xl lg:text-[23px] 2xl:text-3xl text-nowrap font-semibold mb-8 md:hidden lg:block">
          <span className="text-rose-500">Gaming</span> Boi
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
