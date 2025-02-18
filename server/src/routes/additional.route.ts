import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { ActorsSchema } from "../models/additional.model";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3",
  TMDB_API_KEY = Bun.env.TMDB_API_KEY,
  TMDB_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY!,
    },
  };

export const additionalRoute = new Hono().get(
  "/actors/:id",
  zValidator("query", z.object({ type: z.string() })),
  async (c) => {
    const id = c.req.param("id");
    const { type } = c.req.valid("query");

    if (!type) {
      return c.json({ error: "Missing 'type' query parameter" }, 400);
    }

    try {
      const actorsRes = await fetch(
        `${TMDB_API_BASE_URL}/${type}/${id}/credits`,
        TMDB_OPTIONS
      ).then((res) => {
        if (!res.ok)
          throw new Error("Failed to fetch series actors from TMDB.");
        return res.json();
      });

      const parsedActors = ActorsSchema.parse(actorsRes.cast)
        .sort((a: any, b: any) => a.order - b.order)
        .slice(0, 10);

      return c.json(parsedActors);
    } catch (err: any) {
      console.error(`Error fetching ${type} actors:`, err);
      return c.json({ error: err.message || "Failed to fetch actors" }, 500);
    }
  }
);
