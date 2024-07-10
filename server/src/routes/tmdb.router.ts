import { Hono } from "hono";
import { serializeSigned } from "hono/utils/cookie";
import { array } from "zod";

const api = Bun.env.TMDB_API_KEY;

const router = new Hono()
  .get("/id/:id{[0-9]}", (c) => {
    return c.json({
      id: c.req.param("id"),
    });
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

    return c.json({
      movies: movieRes.results
        .slice(0, 3)
        .sort((a: any, b: any) => b.popularity - a.popularity),
      series: seriesRes.results
        .slice(0, 3)
        .sort((a: any, b: any) => b.popularity - a.popularity),
    });
  });

export default router;
