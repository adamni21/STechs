import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { queryClient } from "../App";
import MovieSearch from "./MovieSearch";

import * as SearchMovieMod from "../api/SearchMovie";
import { Movie } from "../types";

vi.mock("../api/SearchMovie", async (importOriginal) => {
  const mod = await importOriginal<typeof SearchMovieMod>();
  return {
    ...mod,
    SearchMovies: vi.fn((search: string) => searchMovieMocked(search)),
  };
});

describe("MovieSearch", () => {
  beforeEach(async () => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    vi.clearAllMocks();
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <MovieSearch />
        </QueryClientProvider>
      )
    );
  });

  it("should have empty search and no results initially", () => {
    const searchBoxElem =
      screen.getByLabelText<HTMLInputElement>(/search for movies/i);
    const resultsElem = screen.getByTestId("searchResults");

    expect(searchBoxElem.value).toBe("");
    expect(within(resultsElem).getByText(/no results!/i)).toBeInTheDocument();
  });

  it("should display all movies from search result", async () => {
    vi.useFakeTimers();
    const searchBoxElem =
      screen.getByLabelText<HTMLInputElement>(/search for movies/i);
    const resultsElem = screen.getByTestId("searchResults");

    await act(async () => {
      fireEvent.change(searchBoxElem, { target: { value: "kert" } });
      vi.advanceTimersToNextTimer();
      await waitFor(() => expect(searchBoxElem).toHaveValue("kert"));
    });

    expect(within(resultsElem).getByText(/nightsession/i)).toBeInTheDocument();
    expect(within(resultsElem).getByText(/die kuckucks/i)).toBeInTheDocument();
    expect(within(resultsElem).getByText(/death hunter/i)).toBeInTheDocument();

    vi.useRealTimers();
  });
});

function searchMovieMocked(search: string) {
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
}
