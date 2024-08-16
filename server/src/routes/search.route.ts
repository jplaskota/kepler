import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getUser } from "../kinde";
import {
  getFormattedMovie,
  getFormattedSeries,
  getSearchMovie,
  getSearchSeries,
} from "../utils/getFormattedContent";
import type { Movie, MovieRaw, MovieSearch } from "./../models/movie.model";
import type { Series, SeriesRaw, SeriesSearch } from "./../models/series.model";

const api = Bun.env.TMDB_API_KEY;
const url = "https://api.themoviedb.org/3";

const searchByIdSchema = z.object({
  type: z.enum(["movie", "tv"]),
});

export const searchRoute = new Hono()
  .get(
    "/id/:id{[0-9]+}",
    getUser,
    zValidator("query", searchByIdSchema),
    async (c) => {
      const id = c.req.param("id") as string;
      const type = c.req.query("type") as "movie" | "tv";

      const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${api}`;

      const results = await fetch(url).then(async (res) => {
        if (!res.ok)
          throw new Error("Network response was not ok (Fetch by id)");

        const json = await res.json();

        if (type === "movie") return getFormattedMovie(json);
        return getFormattedSeries(json as SeriesRaw);
      });

      return c.json(results);
    }
  )
  .get("/title/:title", getUser, async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    const movieRes = await fetch(
      url + "/search/movie?query=" + searchName + "&api_key=" + api
    ).then((res) => {
      if (!res.ok)
        throw new Error("Network response was not ok (Fetch movie by name)");
      return res.json();
    });

    const seriesRes = await fetch(
      url + "/search/tv?query=" + searchName + "&api_key=" + api
    ).then((res) => {
      if (!res.ok)
        throw new Error("Network response was not ok (Fetch series by name)");
      return res.json();
    });

    const moviesPrepared: MovieSearch[] = movieRes.results
      .map((movie: MovieRaw) => getSearchMovie(movie))
      .sort((a: MovieSearch, b: Movie) => b.popularity - a.popularity);

    const seriesPrepared: SeriesSearch[] = seriesRes.results
      .map((res: SeriesRaw) => getSearchSeries(res))
      .sort((a: SeriesSearch, b: SeriesSearch) => b.popularity - a.popularity);

    const data = {
      movies: moviesPrepared.slice(0, 6),
      series: seriesPrepared.slice(0, 6),
    };

    return c.json(data);
  })
  .get("/movie/title/:title", getUser, async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    const movieRes = await fetch(
      url + "/search/movie?query=" + searchName + "&api_key=" + api
    ).then((res) => {
      if (!res.ok)
        throw new Error("Network response was not ok (Fetch movie by name)");
      return res.json();
    });

    const moviesPrepared: Movie[] = movieRes.results
      .map((movie: Movie) => ({
        ...movie,
        media_type: "movie",
      }))
      .sort((a: Movie, b: Movie) => b.popularity - a.popularity)
      .splice(0, 5);

    return c.json(moviesPrepared);
  })
  .get("/series/title/:title", getUser, async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    const seriesRes = await fetch(
      url + "/search/tv?query=" + searchName + "&api_key=" + api
    ).then((res) => {
      if (!res.ok)
        throw new Error("Network response was not ok (Fetch series by name)");
      return res.json();
    });

    const seriesPrepared: SeriesRaw[] = seriesRes.results
      .map((series: SeriesRaw) => getSearchSeries(series))
      .sort((a: SeriesRaw, b: SeriesRaw) => b.popularity - a.popularity)
      .splice(0, 5);

    return c.json(seriesPrepared);
  });

// TODO tests
// TODO add pagination option
// FIXME series sometimes have to many seasons
