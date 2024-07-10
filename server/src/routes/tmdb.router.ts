import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const api = Bun.env.TMDB_API_KEY;

const mediaSchema = z.object({
  type: z.enum(["movie", "tv"]),
});

const router = new Hono()
  .get("/id/:id{[0-9]+}", zValidator("query", mediaSchema), async (c) => {
    const id = c.req.param("id");
    const type = c.req.query("type");

    const idRes = await fetch(
      "https://api.themoviedb.org/3/" + type + "/" + id + "?api_key=" + api
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });

    return c.json(idRes);
  })
  .get("/name/:name", async (c) => {
    const searchName = c.req.param("name").split(" ").join("+");

    const movieRes = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        searchName +
        "&api_key=" +
        api
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });

    const seriesRes = await fetch(
      "https://api.themoviedb.org/3/search/tv?query=" +
        searchName +
        "&api_key=" +
        api
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });

    const moviesWithMediaType = movieRes.results.map((movie: any) => ({
      ...movie,
      media_type: "movie",
    }));

    const seriesWithMediaType = seriesRes.results.map((series: any) => ({
      ...series,
      media_type: "series",
    }));

    return c.json({
      movies: moviesWithMediaType
        .slice(0, 3)
        .sort((a: any, b: any) => b.popularity - a.popularity),
      series: seriesWithMediaType
        .slice(0, 3)
        .sort((a: any, b: any) => b.popularity - a.popularity),
    });
  });

export default router;

//TODO get by id must be searched with media_types (from search by name section) (id of movie can be the same as series id )
