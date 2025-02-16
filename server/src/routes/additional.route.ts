import { Hono } from "hono";
import {
  SeriesActorSchema,
  SeriesSeasonSchema,
  // TActor,
  // TSeason,
} from "../models/series.model";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3",
  TMDB_API_KEY = Bun.env.TMDB_API_KEY,
  OMDB_API_BASE_URL = "http://www.omdbapi.com",
  OMDB_API_KEY = Bun.env.OMDB_API_KEY,
  TMDB_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY!,
    },
  };

export const additionalRoute = new Hono()
  .get("/actors/:id", async (c) => {
    const id = c.req.param("id");

    const Actors = fetch(
      `${TMDB_API_BASE_URL}/movie/${id}/credits`,
      TMDB_OPTIONS
    ).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch movie actors from TMDB");
      return res.json();
    });

    const actors = "actors";
    return c.json(actors);
  })
  .get("/seasons/:id", async (c) => {
    const seasons = "seasons";
    return c.json(seasons);
  });