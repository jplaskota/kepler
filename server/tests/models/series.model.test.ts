import { describe, expect, it } from "bun:test";
import {
  SeriesActorSchema,
  SeriesOMDBSchema,
  SeriesSchema,
  SeriesSearchTMDBSchema,
  SeriesSeasonSchema,
  SeriesTMDBSchema,
} from "../../src/models/series.model";

describe("Series Models", () => {
  describe("SeriesActorSchema", () => {
    it("should validate correct actor data", () => {
      const validActor = {
        id: 123,
        original_name: "John Doe",
        character: "Character Name",
        profile_path: "/path/to/profile.jpg",
        order: 1,
      };

      expect(() => SeriesActorSchema.parse(validActor)).not.toThrow();
    });

    it("should reject invalid actor data", () => {
      const invalidActor = {
        id: "123", // should be number
        original_name: "",
        character: 123, // should be string
        profile_path: null,
        order: "1", // should be number
      };

      expect(() => SeriesActorSchema.parse(invalidActor)).toThrow();
    });
  });
  describe("SeriesSeasonSchema", () => {
    it("should validate correct season data", () => {
      const validSeason = {
        id: 123,
        air_date: "2023-01-01",
        episode_count: 10,
        poster_path: "/path/to/poster.jpg",
        season_number: 1,
      };

      expect(() => SeriesSeasonSchema.parse(validSeason)).not.toThrow();
    });

    it("should allow null air_date", () => {
      const seasonWithNullDate = {
        id: 123,
        air_date: null,
        episode_count: 10,
        poster_path: "/path/to/poster.jpg",
        season_number: 1,
      };

      expect(() => SeriesSeasonSchema.parse(seasonWithNullDate)).not.toThrow();
    });
  });

  describe("SeriesSchema", () => {
    it("should validate correct series data", () => {
      const validSeries = {
        _id: "123e4567-e89b-12d3-a456-426614174000",
        tmdb_id: 123,
        name: "Test Series",
        first_air_date: "2023-01-01",
        number_of_seasons: 3,
        created_by: ["Creator 1", "Creator 2"],
        rated: "TV-MA",
        origin_country: ["US", "UK"],
        genres: ["Drama", "Thriller"],
        actors: [
          {
            id: 123,
            original_name: "John Doe",
            character: "Character Name",
            profile_path: "/path/to/profile.jpg",
            order: 1,
          },
        ],
        overview: "Test overview",
        poster_path: "/path/to/poster.jpg",
        backdrop_path: "/path/to/backdrop.jpg",
        imdb_rating: "8.5",
        rotten_tomatoes: "85%",
        seasons: [
          {
            id: 123,
            air_date: "2023-01-01",
            episode_count: 10,
            poster_path: "/path/to/poster.jpg",
            season_number: 1,
          },
        ],
        vote_average: "8.5",
        popularity: "75.4",
        added_date: new Date(),
        media_type: "tv",
      };

      expect(() => SeriesSchema.parse(validSeries)).not.toThrow();
    });

    it("should reject invalid series data", () => {
      const invalidSeries = {
        _id: "not-a-uuid",
        tmdb_id: "123", // should be number
        name: "", // empty string
        first_air_date: 2023, // should be string
        number_of_seasons: "3", // should be number
        created_by: "Creator", // should be array
        rated: null, // should be string
        origin_country: "US", // should be array
        genres: "Drama", // should be array
        actors: {}, // should be array
        overview: 123, // should be string
        seasons: "not-array", // should be array
        vote_average: null, // should be string
        popularity: null, // should be string
        added_date: "2023-01-01", // should be Date
        media_type: "invalid", // should be "movie" or "tv"
      };

      expect(() => SeriesSchema.parse(invalidSeries)).toThrow();
    });
  });

  describe("SeriesOMDBSchema", () => {
    it("should validate correct OMDB series data", () => {
      const validOMDB = {
        Rated: "PG-13",
        Director: "Christopher Nolan",
        Ratings: [
          { Source: "Internet Movie Database", Value: "8.8/10" },
          { Source: "Rotten Tomatoes", Value: "87%" },
        ],
      };

      expect(() => SeriesOMDBSchema.parse(validOMDB)).not.toThrow();
    });

    it("should reject invalid OMDB data", () => {
      const invalidOMDB = {
        Rated: 123, // should be string
        Director: "", // empty string
        Ratings: "not an array", // should be array
      };

      expect(() => SeriesOMDBSchema.parse(invalidOMDB)).toThrow();
    });
  });

  describe("SeriesSearchTMDBSchema", () => {
    it("should validate correct TMDB series search data", () => {
      const validTMDBSeriesSearch = {
        id: 123,
        name: "Test Series",
        popularity: 4.3,
        poster_path: "/path/to/poster.jpg",
        first_air_date: "2023-01-01",
        vote_average: 8.5,
        genre_ids: [28, 12, 16],
      };

      expect(() =>
        SeriesSearchTMDBSchema.parse(validTMDBSeriesSearch)
      ).not.toThrow();
    });

    it("should transform numeric values to fixed strings", () => {
      const input = {
        id: 123,
        name: "Test Series",
        popularity: 4.33333,
        poster_path: "/path/to/poster.jpg",
        first_air_date: "2023-01-01",
        vote_average: 8.51222,
        genre_ids: [28, 12, 16],
      };

      const result = SeriesSearchTMDBSchema.parse(input);
      expect(result.popularity).toBe("4.3");
      expect(result.vote_average).toBe("8.5");
    });
  });

  describe("SeriesTMDBSchema", () => {
    it("should validate correct TMDB series data", () => {
      const validTMDBSeries = {
        id: 123,
        name: "Test Series",
        first_air_date: "2023-01-01",
        number_of_seasons: 3,
        origin_country: ["US", "UK"],
        genres: [
          { id: 18, name: "Drama" },
          { id: 53, name: "Thriller" },
        ],
        overview: "Test overview",
        poster_path: "/path/to/poster.jpg",
        backdrop_path: "/path/to/backdrop.jpg",
        vote_average: 8.5,
        popularity: 75.4,
        external_ids: {
          imdb_id: "tt1234567",
        },
        created_by: [
          { id: 1, name: "Creator 1" },
          { id: 2, name: "Creator 2" },
        ],
        seasons: [
          {
            id: 123,
            air_date: "2023-01-01",
            episode_count: 10,
            poster_path: "/path/to/poster.jpg",
            season_number: 1,
          },
        ],
      };

      expect(() => SeriesTMDBSchema.parse(validTMDBSeries)).not.toThrow();
    });

    it("should transform numeric values to fixed strings", () => {
      const input = {
        id: 123,
        name: "Test Series",
        first_air_date: "2023-01-01",
        number_of_seasons: 3,
        origin_country: ["US"],
        genres: [{ id: 18, name: "Drama" }],
        overview: "Test overview",
        poster_path: "/path/to/poster.jpg",
        backdrop_path: "/path/to/backdrop.jpg",
        vote_average: 8.54321,
        popularity: 75.46789,
        external_ids: {
          imdb_id: "tt1234567",
        },
        created_by: [{ id: 1, name: "Creator 1" }],
        seasons: [
          {
            id: 123,
            air_date: "2023-01-01",
            episode_count: 10,
            poster_path: "/path/to/poster.jpg",
            season_number: 1,
          },
        ],
      };

      const result = SeriesTMDBSchema.parse(input);
      expect(result.vote_average).toBe("8.5");
      expect(result.popularity).toBe("75.5");
    });

    it("should reject invalid TMDB data", () => {
      const invalidTMDBSeries = {
        id: "123", // should be number
        name: "", // empty string
        first_air_date: 2023, // should be string
        number_of_seasons: "3", // should be number
        origin_country: "US", // should be array
        genres: "Drama", // should be array
        overview: 123, // should be string
        seasons: "not an array", // should be array
        vote_average: null, // should be string
        popularity: null, // should be string
        external_ids: {
          imdb_id: "tt1234567",
        },
        created_by: "Creator", // should be array
      };

      expect(() => SeriesTMDBSchema.parse(invalidTMDBSeries)).toThrow();
    });
  });
});
