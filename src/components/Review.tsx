import { ReviewProps } from "@/types";
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const Review = ({ name, image, reviewText, date, rating, likes = 0 }: ReviewProps) => {
  return (
    <div className="mt-10 ml-5">
      <div className="flex items-start gap-2">
        <Image
          src={image}
          width={100}
          height={100}
          alt="user-image"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-50">{name}</h3>
            <span className="text-gray-400 text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Rating
              style={{ maxWidth: 100 }}
              value={rating}
              readOnly
            />
            <span className="text-gray-400 text-sm">({rating}/5)</span>
          </div>
          <p className="text-gray-400 text-sm">{reviewText}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">{likes}</span>
              <AiOutlineLike size={23} className="text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" />
            </div>
            <span className="text-gray-400 hover:text-rose-500 cursor-pointer transition-colors">Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
