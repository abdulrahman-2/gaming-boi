"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { ItemsType } from "@/types";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import type SwiperType from "swiper";

const SwiperCards = ({
  items,
  paginationImage = false,
  className = "h-96",
  haveBreakpoints = false,
  slidesPerView = 1,
  smSlidesPerView,
  mdSlidesPerView,
  lgSlidesPerView,
}: {
  items: ItemsType[];
  paginationImage?: boolean;
  className?: string;
  haveBreakpoints?: boolean;
  slidesPerView?: number;
  smSlidesPerView?: number;
  mdSlidesPerView?: number;
  lgSlidesPerView?: number;
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>();
  const [progress, setProgress] = useState(0);

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
        slidesPerView={slidesPerView}
        breakpoints={
          haveBreakpoints
            ? {
                475: { slidesPerView },
                640: { slidesPerView: smSlidesPerView },
                768: { slidesPerView: mdSlidesPerView },
                1024: { slidesPerView: lgSlidesPerView },
              }
            : undefined
        }
        onSwiper={(swiper) => setSwiper(swiper)}
        className={`w-full relative ${className}`}
        modules={[Autoplay]}
        autoplay
        loop
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map(({ card }, index) => (
            <SwiperSlide key={index}>{card}</SwiperSlide>
          ))}
        </div>
      </Swiper>

      {paginationImage && (
        <div className="flex items-center gap-2 md:gap-5">
          {items.map(({ src }, index) => (
            <div
              onClick={() => swiper?.slideTo(index)}
              key={index}
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
