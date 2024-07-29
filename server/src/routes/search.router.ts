import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { Movie } from "../models/movie.model";
import type { Series } from "../models/series.model";
import { getFormattedContent } from "../utils/getFormattedContent";

const api = Bun.env.TMDB_API_KEY;

const searchByIdSchema = z.object({
  type: z.enum(["movie", "tv"]),
});

const router = new Hono()
  .get("/id/:id{[0-9]+}", zValidator("query", searchByIdSchema), async (c) => {
    const id = c.req.param("id") as string;
    const type = c.req.query("type") as "movie" | "tv";

    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${api}`;

    const results = await fetch(url).then(async (res) => {
      if (!res.ok) throw new Error("Network response was not ok (Fetch by id)");

      const json = await res.json();

      return getFormattedContent(json, type);
    });

    return c.json(results);
  })
  .get("/title/:title", async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    const movieRes = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        searchName +
        "&api_key=" +
        api
    ).then((res) => {
      if (!res.ok)
        throw new Error("Network response was not ok (Fetch movie by name)");
      return res.json();
    });

    const seriesRes = await fetch(
      "https://api.themoviedb.org/3/search/tv?query=" +
        searchName +
        "&api_key=" +
        api
    ).then((res) => {
      if (!res.ok)
        throw new Error("Network response was not ok (Fetch series by name)");
      return res.json();
    });

    const moviesPrepared: Movie[] = movieRes.results
      .map((movie: Movie) => ({
        ...movie,
        media_type: "movie",
      }))
      .sort((a: Movie, b: Movie) => b.popularity - a.popularity);

    const seriesPrepared: Series[] = seriesRes.results
      .map((series: Series) => ({
        ...series,
        media_type: "tv",
      }))
      .sort((a: Series, b: Series) => b.popularity - a.popularity);

    return c.json({
      movies: moviesPrepared.slice(0, 5),
      series: seriesPrepared.slice(0, 5),
    });
  })
  .get("/movie/title/:title", async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    const movieRes = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        searchName +
        "&api_key=" +
        api
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
      .sort((a: Movie, b: Movie) => b.popularity - a.popularity);
    return c.json(moviesPrepared.splice(0, 5));
  })
  .get("/series/title/:title", async (c) => {
    const searchName = c.req.param("title").split(" ").join("+") as string;

    const seriesRes = await fetch(
      "https://api.themoviedb.org/3/search/tv?query=" +
        searchName +
        "&api_key=" +
        api
    ).then((res) => {
      if (!res.ok)
        throw new Error("Network response was not ok (Fetch series by name)");
      return res.json();
    });

    const seriesPrepared: Series[] = seriesRes.results
      .map((series: Series) => ({
        ...series,
        media_type: "tv",
      }))
      .sort((a: Series, b: Series) => b.popularity - a.popularity);

    return c.json(seriesPrepared.splice(0, 5));
  });

export default router;

// TODO add pagination
// TODO need to return only list of movies/series
// TODO need to return list of lists of movies/series in another route
// FIXME series sometimes have to many seasons
