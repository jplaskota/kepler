import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { Movie } from "../models/movie.model";
import type { Series } from "../models/series.model";

const api = Bun.env.TMDB_API_KEY;

const searchByIdSchema = z.object({
  type: z.enum(["movie", "tv"]),
});

const searchByNameSchema = z.object({
  type: z.enum(["movie", "tv"]).optional(),
});

const router = new Hono()
  .get("/:id{[0-9]+}", zValidator("query", searchByIdSchema), async (c) => {
    const id = c.req.param("id");
    const type = c.req.query("type");

    const results = await fetch(
      "https://api.themoviedb.org/3/" + type + "/" + id + "?api_key=" + api
    ).then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    });

    results.media_type = type;
    return c.json(results);
  })
  .get("/:name", zValidator("query", searchByNameSchema), async (c) => {
    const searchName = c.req.param("name").split(" ").join("+");
    const type = c.req.query("type");

    const movieRes = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        searchName +
        "&api_key=" +
        api
    ).then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    });

    const seriesRes = await fetch(
      "https://api.themoviedb.org/3/search/tv?query=" +
        searchName +
        "&api_key=" +
        api
    ).then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
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

    switch (type) {
      case "movie":
        return c.json(moviesPrepared.splice(0, 10));
      case "tv":
        return c.json(seriesPrepared.splice(0, 10));
      default:
        return c.json({
          movies: moviesPrepared.slice(0, 3),
          series: seriesPrepared.slice(0, 3),
        });
    }
  });

export default router;
