import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import _ from "lodash";
import { z } from "zod";
import type { Movie } from "../models/movie.model";
import type { Series } from "../models/series.model";
import { format } from "../utils/format.utils";

const api = Bun.env.TMDB_API_KEY;

const searchByIdSchema = z.object({
  type: z.enum(["movie", "tv"]),
});

const searchByNameSchema = z.object({
  type: z.enum(["movie", "tv"]).optional(),
});

const router = new Hono()
  .get("/id/:id{[0-9]+}", zValidator("query", searchByIdSchema), async (c) => {
    const id = c.req.param("id");
    const type = c.req.query("type") as "movie" | "tv";

    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${api}`;

    const results = await fetch(url).then(async (res) => {
      if (!res.ok) {
        return { message: res.statusText };
      }

      const json = await res.json();

      return format(json, type);
    });

    return c.json(results);
  })
  .get("/name/:name", zValidator("query", searchByNameSchema), async (c) => {
    const searchName = c.req.param("name").split(" ").join("+");
    const type = c.req.query("type") as "movie" | "tv" | undefined;

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

// TODO add pagination
// FIXME series sometimes have to many seasons
