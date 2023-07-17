import { vi } from "vitest";
import { Movie } from "../../types";

export * from "../SearchMovie";

export const SearchMovie = vi.fn((search: string) => {
  const data: Record<string, Movie[]> = {
    kert: [
      {
        title: "Nightsession",
        imdbId: "tt4796614",
      },
      {
        title: "Die Kuckucks",
        imdbId: "tt0041564",
      },
      {
        title: "Death Hunter",
        imdbId: "tt1736251",
      },
    ],
  };

  return data[search] ?? [];
});
