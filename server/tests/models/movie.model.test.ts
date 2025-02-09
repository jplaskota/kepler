import { describe, expect, it } from "bun:test";
import {
  MovieActorSchema,
  MovieOMDBSchema,
  MovieSchema,
  MovieSearchTMDBSchema,
  MovieTMDBSchema,
} from "../../src/models/movie.model";

describe("Movie Models", () => {
  describe("MovieActorSchema", () => {
    it("should validate correct actor data", () => {
      const validActor = {
        id: 123,
        original_name: "John Doe",
        character: "Character Name",
        profile_path: "/path/to/profile.jpg",
        order: 1,
      };

      expect(() => MovieActorSchema.parse(validActor)).not.toThrow();
    });

    it("should reject invalid actor data", () => {
      const invalidActor = {
        id: "123", // should be number
        original_name: "",
        character: 123, // should be string
        profile_path: null,
        order: "1", // should be number
      };

      expect(() => MovieActorSchema.parse(invalidActor)).toThrow();
    });
  });

  describe("MovieSchema", () => {
    it("should validate correct movie data", () => {
      const validMovie = {
        _id: "123e4567-e89b-12d3-a456-426614174000",
        tmdb_id: 123,
        title: "Test Movie",
        release_date: "2023-01-01",
        runtime: 120,
        director: "Test Director",
        rated: "PG-13",
        origin_country: ["US", "UK"],
        genres: ["Action", "Adventure"],
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
        vote_average: "8.5",
        popularity: "75.4",
        added_date: new Date(),
        media_type: "movie",
      };

      expect(() => MovieSchema.parse(validMovie)).not.toThrow();
    });

    it("should reject invalid movie data", () => {
      const invalidMovie = {
        _id: "not-a-uuid",
        tmdb_id: "123", // should be number
        title: "", // empty string
        release_date: 2023, // should be string
        runtime: "120", // should be number
        director: 123, // should be string
        rated: null, // should be string
        origin_country: "US", // should be array
        genres: "Action", // should be array
        actors: {}, // should be array
        overview: 123, // should be string
        vote_average: null, // should be string
        popularity: null, // should be string
        added_date: "2023-01-01", // should be Date
        media_type: "invalid", // should be "movie" or "series"
      };

      expect(() => MovieSchema.parse(invalidMovie)).toThrow();
    });
  });

  describe("MovieOMDBSchema", () => {
    it("should validate correct OMDB data", () => {
      const validOMDB = {
        Rated: "PG-13",
        Director: "Christopher Nolan",
        Ratings: [
          { Source: "Internet Movie Database", Value: "8.8/10" },
          { Source: "Rotten Tomatoes", Value: "87%" },
        ],
      };

      expect(() => MovieOMDBSchema.parse(validOMDB)).not.toThrow();
    });

    it("should reject invalid OMDB data", () => {
      const invalidOMDB = {
        Rated: 123, // should be string
        Director: "", // empty string
        Ratings: "not an array", // should be array
      };

      expect(() => MovieOMDBSchema.parse(invalidOMDB)).toThrow();
    });
  });

  describe("MovieSearchTMDBSchema", () => {
    it("should validate correct TMDB search data", () => {
      const validTMDBMovieSearch = {
        id: 123,
        title: "Movie Title",
        popularity: 7.8,
        vote_average: 8.5,
        poster_path: "/path/to/poster.jpg",
        release_date: "2023-01-01",
        genre_ids: [28, 12, 16],
      };

      expect(() =>
        MovieSearchTMDBSchema.parse(validTMDBMovieSearch)
      ).not.toThrow();
    });

    it("should transform numeric values to fixed strings", () => {
      const input = {
        id: 123,
        title: "Movie Title",
        popularity: 7.89999,
        vote_average: 8.54321,
        poster_path: "/path/to/poster.jpg",
        release_date: "2023-01-01",
        genre_ids: [28, 12, 16],
      };

      const result = MovieSearchTMDBSchema.parse(input);
      expect(result.popularity).toBe("7.9");
      expect(result.vote_average).toBe("8.5");
    });
  });

  describe("MovieTMDBSchema", () => {
    it("should validate correct TMDB movie data", () => {
      const validTMDBMovie = {
        id: 123,
        imdb_id: "tt1234567",
        title: "Test Movie",
        release_date: "2023-01-01",
        runtime: 120,
        origin_country: ["US", "UK"],
        genres: [
          { id: 28, name: "Action" },
          { id: 12, name: "Adventure" },
        ],
        overview: "Test overview",
        poster_path: "/path/to/poster.jpg",
        backdrop_path: "/path/to/backdrop.jpg",
        vote_average: 8.5,
        popularity: 75.4,
      };

      expect(() => MovieTMDBSchema.parse(validTMDBMovie)).not.toThrow();
    });

    it("should transform numeric values to fixed strings", () => {
      const input = {
        id: 123,
        imdb_id: "tt1234567",
        title: "Test Movie",
        release_date: "2023-01-01",
        runtime: 120,
        origin_country: ["US"],
        genres: [{ id: 28, name: "Action" }],
        overview: "Test overview",
        poster_path: "/path/to/poster.jpg",
        backdrop_path: "/path/to/backdrop.jpg",
        vote_average: 8.54321,
        popularity: 75.46789,
      };

      const result = MovieTMDBSchema.parse(input);
      expect(result.vote_average).toBe("8.5");
      expect(result.popularity).toBe("75.5");
    });

    it("should reject invalid TMDB movie data", () => {
      const invalidTMDBMovie = {
        id: "123", // should be number
        imdb_id: 123, // should be string
        title: "", // empty string
        release_date: 2023, // should be string
        runtime: "120", // should be number
        origin_country: "US", // should be array
        genres: "Action", // should be array of objects
        overview: 123, // should be string
        vote_average: null, // should be string
        popularity: 77.7777, // should be string
      };

      expect(() => MovieTMDBSchema.parse(invalidTMDBMovie)).toThrow();
    });
  });
});
