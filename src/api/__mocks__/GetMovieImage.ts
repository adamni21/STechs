import { vi } from "vitest";

export * from "../GetMovieImage";

const data: Record<string, string> = {
  tt4796614: "/dOjF8ydLEBUAo47JykxntDINRyO.jpg",
  tt0041564: "/mZIICVeTVXRoox4e9oSJKqGwHGb.jpg",
  tt1736251: "/hFCJHLULhgQ1uDdksgAhRHbHfNC.jpg",
};

export const GetMovieImage = vi.fn(
  (imdbId: string) => data[imdbId] ?? undefined
);
