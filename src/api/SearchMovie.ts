import { kyd } from "./kyd";

interface ResponseBody {
  posts: Post[];
}

interface Post {
  title: "string";
  custom_fields: {
    "IMDb-Link": string[];
  };
}

const url = "https://api.netzkino.de.simplecache.net/capi-2.0a/search";

export const SearchMovies = async (
  searchValue: string,
  signal?: AbortSignal
) => {
  if (searchValue.length < 3) return [];

  const json: ResponseBody = await kyd
    .get(url, {
      searchParams: {
        q: searchValue,
        d: import.meta.env.VITE_NETZKINO_KEY as string,
      },
      signal,
    })
    .json();

  return json.posts.map((movie) => {
    const imdbId = extractImdbId(movie.custom_fields["IMDb-Link"][0]);
    return {
      title: movie.title,
      imdbId: imdbId,
    };
  });
};

export function extractImdbId(url: string) {
  try {
    return new URL(url).pathname.split("/")[2];
  } catch (error) {
    return undefined;
  }
}
