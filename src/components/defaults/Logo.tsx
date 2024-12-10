import Link from "next/link";
import { IoGameController } from "react-icons/io5";

const Logo = () => {
  return (
    <Link href="/">
      <h2 className="flex items-center justify-center">
        <span className="text-2xl lg:text-3xl font-bold mb-8 block lg:hidden">
          <IoGameController className="text-white" size={40} />
        </span>
        <span className="text-xl lg:text-[23px] 2xl:text-3xl text-nowrap font-semibold mb-8 md:hidden lg:block">
          <span className="text-rose-500">Gaming</span> Boi
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
