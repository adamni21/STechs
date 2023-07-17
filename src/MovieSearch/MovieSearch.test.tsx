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

vi.mock("../api/SearchMovie");
vi.mock("../api/GetMovieImage");
vi.mock("../hooks/useIntersectedViewport");

describe("MovieSearch", () => {
  beforeEach(async () => {
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
