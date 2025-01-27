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

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3",
  TMDB_API_KEY = Bun.env.TMDB_API_KEY,
  OMDB_API_BASE_URL = "http://www.omdbapi.com/",
  OMDB_API_KEY = Bun.env.OMDB_API_KEY;

export const searchRoute = new Hono()
  .get("/movie/id/:id", async (c) => {
    const movieId = c.req.param("id") as string;

    try {
      // Start fetching data in parallel
      const [tmdbMovieData, tmdbActorsData] = await Promise.all([
        fetch(
          TMDB_API_BASE_URL + "/movie/" + movieId + "?api_key=" + TMDB_API_KEY
        ).then((res) => {
          if (!res.ok)
            throw new Error("Network response was not ok (Fetch movie by id)");
          return res.json();
        }),
        fetch(
          TMDB_API_BASE_URL +
            "/movie/" +
            movieId +
            "/credits?api_key=" +
            TMDB_API_KEY
        ).then((res) => {
          if (!res.ok)
            throw new Error(
              "Network response was not ok (Fetch actors by movie id)"
            );
          return res.json();
        }),
      ]);

      // Parse TMDB data
      const parsedTMDBMovieData = MovieSearchTMDBSchema.parse(tmdbMovieData);
      const parsedActorsData = MovieActorSchema.array().parse(
        tmdbActorsData.cast
      );

      // Fetch OMDB data
      const omdbMovieData = await fetch(
        OMDB_API_BASE_URL +
          "?apikey=" +
          OMDB_API_KEY +
          "&i=" +
          parsedTMDBMovieData.imdb_id
      ).then((res) => {
        if (!res.ok)
          throw new Error(
            "Network response was not ok (Fetch additional movie data by id)"
          );
        return res.json();
      });

      // Parse OMDB data
      const parsedOMDBMovieData = MovieSearchOMDBSchema.parse(omdbMovieData);

      // Prepare the final movie data
      const imdbRating =
        parsedOMDBMovieData.Ratings.find(
          (r) => r.Source === "Internet Movie Database"
        )?.Value.replace("/10", "") ?? undefined;

      const rottenTomatoes =
        parsedOMDBMovieData.Ratings.find((r) => r.Source === "Rotten Tomatoes")
          ?.Value ?? undefined;

      // Prepare the final movie data
      const preparedMovieData: TMovieSearch = {
        ...parsedTMDBMovieData,
        genres: parsedTMDBMovieData.genres.map((g) => g.name),
        director: parsedOMDBMovieData.Director,
        rated: parsedOMDBMovieData.Rated,
        imdb_rating: imdbRating,
        rotten_tomatoes: rottenTomatoes,
        media_type: "movie",
        actors: parsedActorsData.slice(0, 10),
      };

      return c.json(preparedMovieData);
    } catch (err: any) {
      console.error(err);
      return c.json({ error: `An error occurred: ${err.message}` }, 500);
    }
  })
  .get("/movie/title/:title", async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    try {
      const moviesRes = await fetch(
        TMDB_API_BASE_URL +
          "/search/movie?query=" +
          searchName +
          "&api_key=" +
          TMDB_API_KEY
      ).then((res) => {
        if (!res.ok)
          throw new Error("Network response was not ok (Fetch movie by name)");
        return res.json();
      });

      const parsedMovies = MovieSearchCardTMDBSchema.array().parse(
        moviesRes.results
      );

      const moviesPrepared: TMovieSearchCard[] = parsedMovies
        .map(({ genre_ids, ...movie }) => ({
          ...movie,
          media_type: "movie" as const,
          genres: genre_ids
            .map((id) => MovieGenresMap.get(id))
            .filter((g) => g !== undefined),
        }))
        .sort((a, b) => +b.popularity - +a.popularity);
      // .splice(0, 5);

      return c.json(moviesPrepared);
    } catch (err: any) {
      console.error(err);
      return c.json({ error: `An error occurred: ${err.message}` }, 500);
    }
  })
  .get("/series/id/:id", async (c) => {
    const seriesId = c.req.param("id") as string;

    try {
      // Start fetching data in parallel
      const [tmdbSeriesData, tmdbActorsData] = await Promise.all([
        fetch(
          TMDB_API_BASE_URL +
            "/tv/" +
            seriesId +
            "?api_key=" +
            TMDB_API_KEY +
            "&append_to_response=external_ids"
        ).then((res) => {
          if (!res.ok)
            throw new Error("Network response was not ok (Fetch series by id)");
          return res.json();
        }),
        fetch(
          TMDB_API_BASE_URL +
            "/tv/" +
            seriesId +
            "/credits?api_key=" +
            TMDB_API_KEY
        ).then((res) => {
          if (!res.ok)
            throw new Error(
              "Network response was not ok (Fetch actors by series id)"
            );
          return res.json();
        }),
      ]);

      // Parse TMDB data
      const parsedTMDBSeriesData = SeriesSearchTMDBSchema.parse(tmdbSeriesData);
      const parsedActorsData = SeriesActorSchema.array().parse(
        tmdbActorsData.cast
      );

      // Fetch OMDB data
      const omdbSeriesData = await fetch(
        OMDB_API_BASE_URL +
          "?apikey=" +
          OMDB_API_KEY +
          "&i=" +
          parsedTMDBSeriesData.external_ids.imdb_id
      ).then((res) => {
        if (!res.ok)
          throw new Error(
            "Network response was not ok (Fetch additional movie data by id)"
          );
        return res.json();
      });

      const parsedOMDBSeriesData = SeriesSearchOMDBSchema.parse(omdbSeriesData);

      // Prepare the final movie data
      const imdbRating =
        parsedOMDBSeriesData.Ratings.find(
          (r) => r.Source === "Internet Movie Database"
        )?.Value.replace("/10", "") ?? undefined;

      const rottenTomatoes =
        parsedOMDBSeriesData.Ratings.find((r) => r.Source === "Rotten Tomatoes")
          ?.Value ?? undefined;

      const { external_ids, ...restTMDBSeriesData } = parsedTMDBSeriesData;

      const preparedSeriesData: TSeriesSearch = {
        ...restTMDBSeriesData,
        genres: parsedTMDBSeriesData.genres.map((g) => g.name),
        created_by: parsedTMDBSeriesData.created_by.map((c) => c.name),
        rated: parsedOMDBSeriesData.Rated,
        // Remove the special season 0
        seasons: parsedTMDBSeriesData.seasons.filter(
          (s) => s.season_number !== 0
        ),
        imdb_rating: imdbRating,
        rotten_tomatoes: rottenTomatoes,
        media_type: "tv",
        actors: parsedActorsData.slice(0, 10),
        imdb_id: external_ids.imdb_id,
      };

      return c.json(preparedSeriesData);
    } catch (err: any) {
      console.error(err);
      return c.json({ error: `An error occurred: ${err.message}` }, 500);
    }
  })
  .get("/series/title/:title", async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    try {
      const seriesRes = await fetch(
        TMDB_API_BASE_URL +
          "/search/tv?query=" +
          searchName +
          "&api_key=" +
          TMDB_API_KEY
      ).then((res) => {
        if (!res.ok)
          throw new Error("Network response was not ok (Fetch series by name)");
        return res.json();
      });

      const parsedSeries = SeriesSearchCardTMDBSchema.array().parse(
        seriesRes.results
      );

      const seriesPrepared: TSeriesSearchCard[] = parsedSeries
        .map(({ genre_ids, ...series }) => ({
          ...series,
          media_type: "tv" as const,
          genres: genre_ids
            .map((id) => SeriesGenresMap.get(id))
            .filter((g) => g !== undefined),
        }))
        .sort((a, b) => +b.popularity - +a.popularity);
      // .splice(0, 5);

      return c.json(seriesPrepared);
    } catch (err: any) {
      console.error(err);
      return c.json({ error: `An error occurred: ${err.message}` }, 500);
    }
  });

// TODO tests
// TODO add pagination option
// TODO add language option
// TODO splice function
