import { kyd } from "./kyd";

interface ResponseBody {
  movie_results: { poster_path?: string }[];
}

const url = "https://api.themoviedb.org/3/find/";

const api_key = import.meta.env.VITE_TMDB_KEY as string;
const language = "en-US";
const external_source = "imdb_id";

export const GetMovieImage = async (imdbId: string, signal?: AbortSignal) => {
  const json: ResponseBody = await kyd
    .get(url + imdbId, {
      searchParams: {
        api_key,
        language,
        external_source,
      },
      signal,
    })
    .json();

  return json.movie_results[0].poster_path ?? undefined;
};

type Size = "w92" | "w154" | "w185" | "w342" | "w500" | "w780";

const imageBaseUrl = "http://image.tmdb.org/t/p";

export const imageUrl = (path: string, size: Size) =>
  `${imageBaseUrl}/${size}/${path}`;
