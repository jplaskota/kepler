import { Hono } from "hono";
import {
  MovieSearchCardTMDBSchema,
  type TMovieSearchCard,
  type TMovieSearchCardTMDB,
} from "../models/movie.model";
import {
  SeriesSearchCardTMDBSchema,
  type TSeriesSearchCard,
  type TSeriesSearchCardTMDB,
} from "../models/series.model";
import { MovieGenresMap, SeriesGenresMap } from "../utils/genres";

const api = Bun.env.TMDB_API_KEY;
const url = "https://api.themoviedb.org/3";

export const searchRoute = new Hono()
  .get("/movie/title/:title", async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    const moviesRes = await fetch(
      url + "/search/movie?query=" + searchName + "&api_key=" + api
    ).then((res) => {
      if (!res.ok)
        throw new Error("Network response was not ok (Fetch movie by name)");
      return res.json();
    });

    const parsedMovies = MovieSearchCardTMDBSchema.array().parse(
      moviesRes.results
    );

    const moviesPrepared: TMovieSearchCard[] = parsedMovies
      .map(({ genre_ids, ...movie }: TMovieSearchCardTMDB) => ({
        ...movie,
        media_type: "movie" as const,
        genres: genre_ids
          .map((id) => MovieGenresMap.get(id))
          .filter((genre) => genre !== undefined),
      }))
      .sort((a, b) => +b.popularity - +a.popularity);
    // .splice(0, 5);

    return c.json(moviesPrepared);
  })
  .get("/series/title/:title", async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    const seriesRes = await fetch(
      url + "/search/tv?query=" + searchName + "&api_key=" + api
    ).then((res) => {
      if (!res.ok)
        throw new Error("Network response was not ok (Fetch series by name)");
      return res.json();
    });

    const parsedSeries = SeriesSearchCardTMDBSchema.array().parse(
      seriesRes.results
    );

    const seriesPrepared: TSeriesSearchCard[] = parsedSeries
      .map(({ genre_ids, ...series }: TSeriesSearchCardTMDB) => ({
        ...series,
        media_type: "tv" as const,
        genres: genre_ids
          .map((id) => SeriesGenresMap.get(id))
          .filter((genre) => genre !== undefined),
      }))
      .sort((a, b) => +b.popularity - +a.popularity);
    // .splice(0, 5);

    return c.json(seriesPrepared);
  });

// TODO tests
// TODO add pagination option
// TODO add language option
// TODO splice function
