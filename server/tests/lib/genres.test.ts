import { describe, expect, it } from "bun:test";
import { MovieGenresMap, SeriesGenresMap } from "../../src/lib/genres";

describe("Genres", () => {
  describe("MovieGenresMap", () => {
    it("should correctly map movie genre IDs to names", () => {
      expect(MovieGenresMap.get(28)).toBe("Action");
      expect(MovieGenresMap.get(12)).toBe("Adventure");
      expect(MovieGenresMap.get(16)).toBe("Animation");
    });

    it("should return undefined for non-existent movie genre ID", () => {
      expect(MovieGenresMap.get(999999)).toBeUndefined();
    });
  });

  describe("SeriesGenresMap", () => {
    it("should correctly map series genre IDs to names", () => {
      expect(SeriesGenresMap.get(10759)).toBe("Action & Adventure");
      expect(SeriesGenresMap.get(16)).toBe("Animation");
      expect(SeriesGenresMap.get(35)).toBe("Comedy");
    });

    it("should return undefined for non-existent series genre ID", () => {
      expect(SeriesGenresMap.get(999999)).toBeUndefined();
    });
  });
});