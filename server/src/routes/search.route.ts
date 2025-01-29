import { Hono } from "hono";
import {
  MovieSearchTMDBSchema,
  type TMovieSearchCard,
} from "../models/movie.model";
import {
  SeriesSearchTMDBSchema,
  type TSeriesSearchCard,
} from "../models/series.model";
import {
  fetchMovieDetails,
  fetchSeriesDetails,
} from "../services/tmdb.services";
import { MovieGenresMap, SeriesGenresMap } from "../utils/genres";

// API base URLs and keys for TMDB and OMDB services
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3",
  TMDB_API_KEY = Bun.env.TMDB_API_KEY,
  OMDB_API_BASE_URL = "http://www.omdbapi.com/",
  OMDB_API_KEY = Bun.env.OMDB_API_KEY;

export const searchRoute = new Hono()
  .get("/movie/id/:id", async (c) => {
    const movieId = c.req.param("id");

    try {
      const movieDetails = await fetchMovieDetails(Number(movieId));
      return c.json(movieDetails);
    } catch (err: any) {
      console.error("Error fetching movie by ID:", err);
      return c.json({ error: err.message || "Internal Server Error" }, 500);
    }
  })
  // Search for movies by title
  .get("/movie/title/:title", async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    try {
      // Fetch movies matching the search query from TMDB
      const moviesRes = await fetch(
        `${TMDB_API_BASE_URL}/search/movie?query=${searchName}&api_key=${TMDB_API_KEY}`
      ).then((res) => {
        if (!res.ok)
          throw new Error("Failed to fetch movies by title from TMDB.");
        return res.json();
      });

      // Validate and parse the response data using the defined schema
      const parsedMovies = MovieSearchTMDBSchema.array().parse(
        moviesRes.results
      );

      // Map genre IDs to names and prepare the final list of movies
      const moviesPrepared: TMovieSearchCard[] = parsedMovies
        .map(({ genre_ids, id, ...movie }) => ({
          ...movie,
          tmdb_id: id,
          media_type: "movie" as const,
          genres: genre_ids
            .map((id) => MovieGenresMap.get(id))
            .filter((g) => g !== undefined),
        }))
        .sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity))
        .slice(0, 8);

      return c.json(moviesPrepared);
    } catch (err: any) {
      console.error("Error fetching movies by title:", err);
      return c.json({ error: err.message || "Internal Server Error" }, 500);
    }
  })
  // Fetch detailed information about a TV series by its ID
  .get("/series/id/:id", async (c) => {
    const seriesId = c.req.param("id");

    try {
      const seriesDetails = await fetchSeriesDetails(Number(seriesId));
      return c.json(seriesDetails);
    } catch (err: any) {
      console.error("Error fetching series by ID:", err);
      return c.json({ error: err.message || "Internal Server Error" }, 500);
    }
  })
  // Search for TV series by title
  .get("/series/title/:title", async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    try {
      // Fetch series matching the search query from TMDB
      const seriesRes = await fetch(
        `${TMDB_API_BASE_URL}/search/tv?query=${searchName}&api_key=${TMDB_API_KEY}`
      ).then((res) => {
        if (!res.ok)
          throw new Error("Failed to fetch series by title from TMDB.");
        return res.json();
      });

      // Validate and parse the response data using the defined schema
      const parsedSeries = SeriesSearchTMDBSchema.array().parse(
        seriesRes.results
      );

      // Map genre IDs to names and prepare the final list of series
      const seriesPrepared: TSeriesSearchCard[] = parsedSeries
        .map(({ genre_ids, id, ...series }) => ({
          ...series,
          tmdb_id: id,
          media_type: "tv" as const,
          genres: genre_ids
            .map((id) => SeriesGenresMap.get(id))
            .filter((g) => g !== undefined),
        }))
        .sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity))
        .slice(0, 8);

      return c.json(seriesPrepared);
    } catch (err: any) {
      console.error("Error fetching series by title:", err);
      return c.json({ error: err.message || "Internal Server Error" }, 500);
    }
  });

// TODO: Add tests for the endpoints
// TODO: Implement pagination option
// TODO: Implement language option
// TODO: Add splice function
