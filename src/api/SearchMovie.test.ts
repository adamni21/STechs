import { beforeEach, describe, expect, it, vi } from "vitest";
import { extractImdbId } from "./SearchMovie";
import { SearchMovie } from "./SearchMovie";
import { kyd } from "./kyd";

describe("SearchMovie", () => {
  const kydGetSpy = vi.spyOn(kyd, "get");
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not make ky request if 'searchValue' is too short", async () => {
    await SearchMovie("jk");

    expect(kydGetSpy).not.toHaveBeenCalled();
  });

  it("should should make ky request if 'searchValue is long enough", async () => {
    expect(kydGetSpy).not.toHaveBeenCalled();

    await SearchMovie("hit");

    expect(kydGetSpy).toHaveBeenCalledOnce();
  });
});

describe("extractImdbId", () => {
  it("should extract id", () => {
    expect(extractImdbId("http:/www.imdb.com/title/tt1042517")).toBe(
      "tt1042517"
    );
  });

  it("should extract id with url params in url", () => {
    expect(
      extractImdbId("http:/www.imdb.com/title/tt1042517?some_param=arg")
    ).toBe("tt1042517");
  });

  it("should return 'undefined' if input isn't a valid url", () => {
    expect(extractImdbId("")).toBe(undefined);
  });
});
