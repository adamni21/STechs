import { describe, expect, it } from "vitest";
import { extractImdbId } from "./SearchMovie";

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
