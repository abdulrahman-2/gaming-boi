import { BiLoaderCircle } from "react-icons/bi";

const Loading = ({ size }: { size: number }) => {
  return <BiLoaderCircle size={size} className="animate-spin text-rose-500" />;
};

export default Loading;
