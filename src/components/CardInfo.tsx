import { Button } from "@/components/ui/button";
import { CardInfoType } from "@/types";
import Image from "next/image";
import MotionDiv from "./defaults/MotionDiv";

const CardInfo = ({
  desc,
  title,
  image,
  textBtn,
  btnClasses,
}: CardInfoType) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
      className="flex flex-col items-start absolute left-5 md:left-20 top-5 md:top-20 max-w-md"
    >
      <div className="w-52 h-32 md:w-96 md:h-40 relative">
        <Image src={image} fill alt={`${title}`} className=" object-contain" />
      </div>
      <h1 className="text-white text-xl md:text-2xl font-semibold">{title}</h1>
      <p className="text-sm md:text-base text-gray-200">{desc}</p>
      <Button className={`rounded-full mt-5 ${btnClasses || "text-gray-50"}`}>
        {textBtn || "Find out more !"}
      </Button>
    </MotionDiv>
  );
};

export default CardInfo;
