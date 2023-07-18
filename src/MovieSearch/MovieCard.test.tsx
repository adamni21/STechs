import { act, render, screen } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { queryClient } from "../App";
import MovieCard from "./MovieCard";

vi.mock("../hooks/useIntersectedViewport");
vi.mock("../api/GetMovieImage");

describe("MovieCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show title", async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <MovieCard title="test" />
        </QueryClientProvider>
      )
    );

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it("should show poster if available", async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <MovieCard title="Nightsession" imdbId="tt4796614" />
        </QueryClientProvider>
      )
    );
    const imageElem =
      screen.getByAltText<HTMLImageElement>(/Nightsession poster/i);

    expect(imageElem.src).toBe(
      "http://image.tmdb.org/t/p/w185/dOjF8ydLEBUAo47JykxntDINRyO.jpg"
    );
  });

  it(`should show "No poster"-error if imdbId is 'undefined'`, async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <MovieCard title="Nightsession" />
        </QueryClientProvider>
      )
    );

    expect(screen.getByText(/no poster/i)).toBeInTheDocument();
  });

  it(`should show "No poster"-error if tmdb has no poster`, async () => {
    await act(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <MovieCard title="Nightsession" imdbId="ttInvalid" />
        </QueryClientProvider>
      )
    );

    expect(screen.getByText(/no poster/i)).toBeInTheDocument();
  });
});
