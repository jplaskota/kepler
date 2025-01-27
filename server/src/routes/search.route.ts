import { Hono } from "hono";
import {
  MovieActorSchema,
  MovieSearchCardTMDBSchema,
  MovieSearchOMDBSchema,
  MovieSearchTMDBSchema,
  type TMovieSearch,
  type TMovieSearchCard,
} from "../models/movie.model";
import {
  SeriesActorSchema,
  SeriesSearchCardTMDBSchema,
  SeriesSearchOMDBSchema,
  SeriesSearchTMDBSchema,
  type TSeriesSearch,
  type TSeriesSearchCard,
} from "../models/series.model";
import { MovieGenresMap, SeriesGenresMap } from "../utils/genres";

// API base URLs and keys for TMDB and OMDB services
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3",
  TMDB_API_KEY = Bun.env.TMDB_API_KEY,
  OMDB_API_BASE_URL = "http://www.omdbapi.com/",
  OMDB_API_KEY = Bun.env.OMDB_API_KEY;

export const searchRoute = new Hono()
  // Fetch detailed information about a movie by its ID
  .get("/movie/id/:id", async (c) => {
    const movieId = c.req.param("id") as string;

    try {
      // Fetch movie details and actors data from TMDB in parallel
      const [tmdbMovieData, tmdbActorsData] = await Promise.all([
        fetch(
          `${TMDB_API_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
        ).then((res) => {
          if (!res.ok)
            throw new Error("Failed to fetch movie details from TMDB.");
          return res.json();
        }),
        fetch(
          `${TMDB_API_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
        ).then((res) => {
          if (!res.ok)
            throw new Error("Failed to fetch movie actors from TMDB.");
          return res.json();
        }),
      ]);

      // Validate and parse the TMDB movie data using the defined schema
      const parsedTMDBMovieData = MovieSearchTMDBSchema.parse(tmdbMovieData);
      const parsedActorsData = MovieActorSchema.array().parse(
        tmdbActorsData.cast
      );

      // Fetch additional movie details from OMDB
      const omdbMovieData = await fetch(
        `${OMDB_API_BASE_URL}?apikey=${OMDB_API_KEY}&i=${parsedTMDBMovieData.imdb_id}`
      ).then((res) => {
        if (!res.ok)
          throw new Error(
            "Failed to fetch additional movie details from OMDB."
          );
        return res.json();
      });

      // Validate and parse the OMDB movie data
      const parsedOMDBMovieData = MovieSearchOMDBSchema.parse(omdbMovieData);

      // Extract IMDb and Rotten Tomatoes ratings from OMDB data
      const imdbRating =
        parsedOMDBMovieData.Ratings.find(
          (r) => r.Source === "Internet Movie Database"
        )?.Value.replace("/10", "") ?? undefined;

      const rottenTomatoes =
        parsedOMDBMovieData.Ratings.find((r) => r.Source === "Rotten Tomatoes")
          ?.Value ?? undefined;

      // Combine data from TMDB and OMDB to prepare the final response
      const preparedMovieData: TMovieSearch = {
        ...parsedTMDBMovieData,
        genres: parsedTMDBMovieData.genres.map((g) => g.name),
        director: parsedOMDBMovieData.Director,
        rated: parsedOMDBMovieData.Rated,
        imdb_rating: imdbRating,
        rotten_tomatoes: rottenTomatoes,
        media_type: "movie",
        actors: parsedActorsData.slice(0, 10), // Limit to top 10 actors
      };

      return c.json(preparedMovieData);
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
      const parsedMovies = MovieSearchCardTMDBSchema.array().parse(
        moviesRes.results
      );

      // Map genre IDs to names and prepare the final list of movies
      const moviesPrepared: TMovieSearchCard[] = parsedMovies
        .map(({ genre_ids, ...movie }) => ({
          ...movie,
          media_type: "movie" as const,
          genres: genre_ids
            .map((id) => MovieGenresMap.get(id))
            .filter((g) => g !== undefined),
        }))
        .sort((a, b) => +b.popularity - +a.popularity); // Sort by popularity

      return c.json(moviesPrepared);
    } catch (err: any) {
      console.error("Error fetching movies by title:", err);
      return c.json({ error: err.message || "Internal Server Error" }, 500);
    }
  })
  // Fetch detailed information about a TV series by its ID
  .get("/series/id/:id", async (c) => {
    const seriesId = c.req.param("id") as string;

    try {
      // Fetch series details and actors data from TMDB in parallel
      const [tmdbSeriesData, tmdbActorsData] = await Promise.all([
        fetch(
          `${TMDB_API_BASE_URL}/tv/${seriesId}?api_key=${TMDB_API_KEY}&append_to_response=external_ids`
        ).then((res) => {
          if (!res.ok)
            throw new Error("Failed to fetch series details from TMDB.");
          return res.json();
        }),
        fetch(
          `${TMDB_API_BASE_URL}/tv/${seriesId}/credits?api_key=${TMDB_API_KEY}`
        ).then((res) => {
          if (!res.ok)
            throw new Error("Failed to fetch series actors from TMDB.");
          return res.json();
        }),
      ]);

      // Validate and parse the TMDB series data
      const parsedTMDBSeriesData = SeriesSearchTMDBSchema.parse(tmdbSeriesData);
      const parsedActorsData = SeriesActorSchema.array().parse(
        tmdbActorsData.cast
      );

      // Fetch additional series details from OMDB
      const omdbSeriesData = await fetch(
        `${OMDB_API_BASE_URL}?apikey=${OMDB_API_KEY}&i=${parsedTMDBSeriesData.external_ids.imdb_id}`
      ).then((res) => {
        if (!res.ok)
          throw new Error(
            "Failed to fetch additional series details from OMDB."
          );
        return res.json();
      });

      // Validate and parse the OMDB series data
      const parsedOMDBSeriesData = SeriesSearchOMDBSchema.parse(omdbSeriesData);

      // Extract IMDb and Rotten Tomatoes ratings from OMDB data
      const imdbRating =
        parsedOMDBSeriesData.Ratings.find(
          (r) => r.Source === "Internet Movie Database"
        )?.Value.replace("/10", "") ?? undefined;

      const rottenTomatoes =
        parsedOMDBSeriesData.Ratings.find((r) => r.Source === "Rotten Tomatoes")
          ?.Value ?? undefined;

      // Combine data from TMDB and OMDB to prepare the final response
      const { external_ids, ...restTMDBSeriesData } = parsedTMDBSeriesData;
      const preparedSeriesData: TSeriesSearch = {
        ...restTMDBSeriesData,
        genres: parsedTMDBSeriesData.genres.map((g) => g.name),
        created_by: parsedTMDBSeriesData.created_by.map((c) => c.name),
        rated: parsedOMDBSeriesData.Rated,
        seasons: parsedTMDBSeriesData.seasons.filter(
          (s) => s.season_number !== 0 // Exclude special season 0
        ),
        imdb_rating: imdbRating,
        rotten_tomatoes: rottenTomatoes,
        media_type: "tv",
        actors: parsedActorsData.slice(0, 10), // Limit to top 10 actors
        imdb_id: external_ids.imdb_id,
      };

      return c.json(preparedSeriesData);
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
      const parsedSeries = SeriesSearchCardTMDBSchema.array().parse(
        seriesRes.results
      );

      // Map genre IDs to names and prepare the final list of series
      const seriesPrepared: TSeriesSearchCard[] = parsedSeries
        .map(({ genre_ids, ...series }) => ({
          ...series,
          media_type: "tv" as const,
          genres: genre_ids
            .map((id) => SeriesGenresMap.get(id))
            .filter((g) => g !== undefined),
        }))
        .sort((a, b) => +b.popularity - +a.popularity); // Sort by popularity

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
