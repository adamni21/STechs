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

const url =
  "https://api.netzkino.de.simplecache.net/capi-2.0a/search?q=hitchcock&d=devtest";

export const SearchMovies = async (
  searchValue: string,
  signal?: AbortSignal
) => {
  const json: ResponseBody = await kyd
    .get(url, {
      searchParams: {
        q: searchValue,
        d: import.meta.env.VITE_NETZKINO_KEY as string,
      },
      signal,
    })
    .json();

  return json.posts.map((movie) => ({
    title: movie.title,
    imdbId: new URL(movie.custom_fields["IMDb-Link"][0]).pathname.split("/")[2],
  }));
};
