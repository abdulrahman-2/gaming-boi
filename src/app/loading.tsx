import { BiLoaderCircle } from "react-icons/bi";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <BiLoaderCircle size={50} className="animate-spin text-rose-500" />
    </div>
  );
};

export default loading;
