import { beforeEach, describe, expect, it, vi } from "vitest";
import { kyd } from "./kyd";
import { GetMovieImage } from "./GetMovieImage";

describe("GetMovieImage", () => {
  const kydGetSpy = vi.spyOn(kyd, "get");
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not make ky request if 'imdbId' is empty", async () => {
    await GetMovieImage("");

    expect(kydGetSpy).not.toHaveBeenCalled();
  });

  it("should not make ky request if 'imdbId' is 'undefined'", async () => {
    await GetMovieImage(undefined);

    expect(kydGetSpy).not.toHaveBeenCalled();
  });
});
