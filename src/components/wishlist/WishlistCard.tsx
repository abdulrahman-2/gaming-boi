import { Game } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaPlaystation, FaSteam, FaXbox } from "react-icons/fa6";
import AddToWishlist from "./AddToWishlist";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import ImageSwisher from "../ImageSwisher";

const WishlistCard = ({
  game,
  wishlist,
}: {
  game: Game;
  wishlist?: boolean;
}) => {
  return (
    <HoverCard>
      <div className=" flex relative flex-col items-start gap-4">
        <HoverCardTrigger className="relative cursor-pointer w-full" asChild>
          <div>
            <div className=" relative flex flex-col gap-2">
              <div className="hover:opacity-80 duration-150 w-full overflow-hidden h-64 relative rounded-xl">
                <Image
                  className=" object-cover"
                  src={game.background_image}
                  alt={game.name}
                  fill
                />
              </div>
              <Link
                href={`/game/${game.id}`}
                className=" text-sm line-clamp-1 font-semibold text-white"
              >
                {game.name}
              </Link>
              <div key={game.id} className=" mt-2 flex items-center gap-1">
                {game.parent_platforms.map((platform, i) => (
                  <p key={`platform-${platform.platform.id}-${i}`}>
                    {platform.platform.slug === "pc" ? (
                      <FaSteam />
                    ) : platform.platform.slug.includes("playstation") ? (
                      <FaPlaystation className=" text-blue-500" />
                    ) : platform.platform.slug.includes("xbox") ? (
                      <FaXbox className=" text-green-500" />
                    ) : null}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        {wishlist && (
          <div className=" absolute right-2 z-10 cursor-pointer top-2">
            <AddToWishlist gameId={game.id.toString()} />
          </div>
        )}
      </div>
      <HoverCardContent
        align="center"
        className="w-full bg-transparent border-none"
      >
        {game.short_screenshots && (
          <ImageSwisher game={game} images={game.short_screenshots} />
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default WishlistCard;
