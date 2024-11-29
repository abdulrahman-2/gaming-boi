import React from "react";
import SwiperCards from "../SwiperCards";
import CardInfo from "../CardInfo";

const items = [
  {
    id: 1,
    src: "/poster.webp",
    card: (
      <section className="w-full h-full relative rounded-2xl overflow-hidden">
        <video
          autoPlay
          loop={true}
          muted={true}
          className="w-full h-full absolute inset-0 object-cover object-top"
        >
          <source src="/spidervideo.mp4" type="video/mp4" />
        </video>
        <CardInfo
          btnClasses="text-gray-50 bg-red-500 hover:bg-red-400"
          desc="Peter Parker & Miles Morales return for an exciting new adventure in the acclaimed Marvel’s Spider-Man franchise, out October 20 for PS5."
          title="BE GREATER TOGETHER"
          image="/news1title.webp"
        />
      </section>
    ),
  },
  {
    id: 2,
    src: "/call-of-duty-black-ops-6-hero-desktop-01-en-21may24.webp",
    card: (
      <section className="w-full h-full relative rounded-2xl overflow-hidden">
        <video
          autoPlay
          loop={true}
          muted={true}
          className="w-full h-full absolute inset-0 object-cover object-top"
        >
          <source
            src="/call-of-duty-black-ops-6-animated-hero-mobile-01-en-22may24.mp4"
            type="video/mp4"
          />
        </video>
        <CardInfo
          btnClasses="text-gray-50 bg-orange-500 hover:bg-orange-400"
          desc="Last chance to pre-order and get access to additional premium content. Call of Duty®: Black Ops 6 launches on October 25th"
          title="The truth lies"
          image="/call-of-duty-black-ops-6-logo-01-en-21may24.webp"
        />
      </section>
    ),
  },
  {
    id: 3,
    src: "/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.webp",
    card: (
      <section className="w-full h-full relative rounded-2xl overflow-hidden">
        <video
          autoPlay
          loop={true}
          muted={true}
          className="w-full h-full absolute inset-0 object-cover object-top"
        >
          <source src="/dragon-ball-ved.mp4" type="video/mp4" />
        </video>
        <CardInfo
          btnClasses="text-gray-50 bg-[#C94123] hover:bg-[#C94123]/80"
          desc="A legendary series has returned. Reach new levels of power in Dragon Ball: Sparking! Zero, out now on PS5"
          title="Shake the earth. Break the universe !"
          image="/Dragon-Ball-Sparking-Zero-logo-01-03oct24.webp"
        />
      </section>
    ),
  },
  {
    id: 4,
    src: "/cyb.webp",
    card: (
      <section className="w-full h-full relative rounded-2xl overflow-hidden">
        <video
          autoPlay
          loop={true}
          muted={true}
          className="w-full h-full absolute inset-0 object-cover object-top"
        >
          <source
            src="/cyberpunk-2077-phantom-liberty-video-hero-01-en-11sep23.mp4"
            type="video/mp4"
          />
        </video>
        <CardInfo
          btnClasses="text-gray-900 z-20 bg-white hover:bg-white/80"
          desc="As cyber-enhanced mercenary V, join secret agent Solomon Reed to unravel a web of sinister political machinations."
          title="Freedom Always Comes At A Price…"
          image="/iconcyber.webp"
        />
      </section>
    ),
  },
];

const Hero = () => {
  return (
    <div>
      <SwiperCards
        items={items}
        className="h-[30rem] md:h-[35rem]"
        paginationImage
      />
    </div>
  );
};

export default Hero;
