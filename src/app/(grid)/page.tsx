import GamesSlider from "@/components/sections/GamesSlider";
import Hero from "@/components/sections/Hero";
import { getGamesByIds, searchGames } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";

const Home = async () => {
  await connectDB();
  const data = await searchGames("", 2, [], 9);
  const ps5 = await searchGames(
    "",
    1,
    [
      { filterName: "platforms", option: "187" },
      {
        filterName: "ordering",
        option: "-metacritic",
      },
    ],
    10
  );
  const pc = await searchGames(
    "",
    1,
    [{ filterName: "platforms", option: "4" }],
    10
  );
  const { results } = data.data;
  const customGames = await getGamesByIds([
    "799265",
    "58550",
    "2462",
    "494384",
    "452642",
    "452634",
  ]);
  return (
    <main className="mt-5 md:mt-7">
      <Hero />

      <GamesSlider title="Top Games for PS5" games={ps5.data.results} />
      <GamesSlider title="Top Games" games={results} />
      <GamesSlider
        slidesPerView={1}
        smSlidesPerView={1}
        mdSlidesPerView={2}
        lgSlidesPerView={2}
        screenBig
        title="PLAYSTATION EXCLUSIVES"
        games={customGames.map((game) => game.data)}
      />
      <GamesSlider title="Top PC Games" games={pc.data.results} />
    </main>
  );
};

export default Home;
