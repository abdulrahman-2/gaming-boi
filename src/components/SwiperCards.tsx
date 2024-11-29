"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { ItemsType } from "@/types/types";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import type SwiperType from "swiper";

const SwiperCards = ({
  items,
  paginationImage = false,
  className = "h-96",
}: {
  items: ItemsType[];
  paginationImage?: boolean;
  className?: string;
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>();
  const [progress, setProgress] = useState(0);

  console.log(progress);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 3.7));
    }, 110);
    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    swiper?.on("slideChange", () => setProgress(0));
  }, [swiper]);
  return (
    <div className="flex flex-col gap-5">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
        className={`w-full relative ${className}`}
        modules={[Autoplay]}
        autoplay
        loop
      >
        {items.map(({ card, id }) => (
          <SwiperSlide key={id}>{card}</SwiperSlide>
        ))}
      </Swiper>

      {paginationImage && (
        <div className="flex items-center gap-2">
          {items.map(({ src, id }, index) => (
            <div
              onClick={() => swiper?.slideTo(index)}
              key={id}
              className={`${
                swiper?.realIndex === index &&
                "-translate-y-7 opacity-85 shadow-md duration-200 border md:border-2 border-rose-500"
              } max-w-lg w-full h-20 md:h-44 hover:-translate-y-7 hover:opacity-85 hover:shadow-md duration-200 cursor-pointer z-10 relative rounded-xl overflow-hidden`}
            >
              {swiper?.realIndex === index && (
                <div
                  className="w-0 h-full absolute z-10 bg-gray-800/60"
                  style={{ width: `${progress}%` }}
                />
              )}
              {src && (
                <Image
                  src={src}
                  alt="card-image"
                  className="object-cover absolute"
                  fill
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SwiperCards;
