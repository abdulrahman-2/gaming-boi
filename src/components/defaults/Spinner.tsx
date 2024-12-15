import { BiLoaderCircle } from "react-icons/bi";

const Spinner = ({ size }: { size: number }) => {
  return <BiLoaderCircle size={size} className="animate-spin text-rose-500" />;
};

export default Spinner;
