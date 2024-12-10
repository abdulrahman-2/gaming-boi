const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const fetchFn = (url: string, cache?: number) =>
  fetch(url, { next: { revalidate: cache || 3600 } }).then((res) => res.json());
export const searchGames = async function (
  query?: string,
  page = 1,
  filters?: { filterName: string; option: string }[],
  page_size = 20,
  cache: number = 0
) {
  const data = await fetchFn(
    `${apiUrl}/games?search=${query}&page_size=${page_size}&page=${page}&${filters
      ?.map((filter: any) => `${filter.filterName}=${filter.option}&`)
      .join("")}&key=${apiKey}`,
    cache
  );
  const count = data.count;

  return { data, count };
};
export const getGame = async function (id: string) {
  try {
    const data = await fetchFn(`${apiUrl}/games/${id}?key=${apiKey}`); //details
    const screenshots = await fetchFn(
      `${apiUrl}/games/${id}/screenshots?&key=${apiKey}`
    ); //screenshots
    const similar = await fetchFn(
      `${apiUrl}/games/${id}/game-series?key=${apiKey}`
    ); //simimlar
    return { data, screenshots, similar };
  } catch (err) {
    throw err;
  }
};
export const getGameFromgenres = async function (genre = "51") {
  const data = await fetchFn(
    `${apiUrl}/games?genres=${genre}&page_size=15&key=${apiKey}`
  );
  return data;
};
export const gamebyplatforms = async function (
  id: string,
  page = 1,
  page_size = 20
) {
  const data = await fetchFn(
    `${apiUrl}/games?platforms=${id}&page_size=${
      page_size || 40
    }&page=${page}&key=${apiKey}`
  );
  return data;
};
export const getGamesByIds = async function (ids: string[]) {
  const data = await Promise.all(ids.map((id) => getGame(id)));
  return data;
};
