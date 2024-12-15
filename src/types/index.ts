export type LinkType = {
  label: string;
  href: string;
  icon: React.ReactElement;
};

export type ItemsType = {
  src?: string;
  card: React.ReactNode;
};

export type CardInfoType = {
  desc: string;
  title: string;
  image: string;
  textBtn?: string;
  btnClasses?: string;
};

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  background_image_additional: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: AddedByStatus;
  description_raw: string;
  metacritic: number | null;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: any | null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: Platform[];
  parent_platforms: ParentPlatform[];
  genres: Genre[];
  stores: Store[];
  clip: string | null;
  tags: Tag[];
  esrb_rating: EsrbRating | null;
  short_screenshots: Images;
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Store {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface WishlistType {
  handleAddToWishlist: (gameId: string) => void;
  wishlist: string[];
}

export interface ImageType {
  id: number;
  height: number;
  width: number;
  image: string;
  is_deleted: boolean;
}

export interface Images {
  count: number;
  next: string | null;
  previous: string | null;
  results: ImageType[];
}
