import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { Movies } from "../db/schema/movies.schema";
import { getUser } from "../kinde";
import type { TMovie } from "../models/movie.model";
import { InsertMoviesSchema } from "../models/movie.model";
import { fetchMovieDetails } from "../services/tmdb.services";

export const movieRoute = new Hono()
  // Route to fetch all movies for a user
  .get("/", getUser, async (c) => {
    const userId = c.var.user.id;

    try {
      // Fetch movies from the database for the logged-in user
      const movies = await db
        .select()
        .from(Movies)
        .where(eq(Movies.user_id, userId));

      // Return empty array if no movies are found
      if (!movies.length) return c.json([]);

      // Return the list of movies as JSON
      return c.json(movies);
    } catch (err: any) {
      console.error("Error fetching movies list:", err);
      return c.json({ error: "Failed to fetch movies list." }, 500);
    }
  })

  // Route to fetch a specific movie by its ID
  .get("/id/:id", getUser, async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    try {
      const movieExist = await db
        .select()
        .from(Movies)
        .where(and(eq(Movies.user_id, userId), eq(Movies._id, id)));

      if (!movieExist.length) return c.notFound();

      const movieDetails = await fetchMovieDetails(movieExist[0].tmdb_id);

      return c.json({
        ...movieDetails,
        _id: movieExist[0]._id,
        added_date: movieExist[0].added_date,
      });
    } catch (err: any) {
      console.error("Error fetching movie by ID:", err);
      return c.json({ error: err.message || "Failed to fetch movie" }, 500);
    }
  })

  // Route to add a new movie for the logged-in user
  .post("/", getUser, zValidator("json", InsertMoviesSchema), async (c) => {
    const movie = c.req.valid("json");
    const userId = c.var.user.id;

    try {
      // Check if the movie already exists in the database
      const movieExist = await db
        .select()
        .from(Movies)
        .where(
          and(eq(Movies.user_id, userId), eq(Movies.tmdb_id, movie.tmdb_id))
        );

      // Return a 409 response if the movie already exists
      if (movieExist.length) return c.text("Movie already exists.", 409);

      try {
        // Insert the new movie into the database
        const results = await db.insert(Movies).values({
          ...movie,
          user_id: userId,
        });

        // Return the inserted series data as JSON
        return c.json(results, 201);
      } catch (err) {
        console.error("Error inserting movie:", err);
        return c.json(
          { error: "Failed to insert movie into the database." },
          500
        );
      }
    } catch (err: any) {
      console.error("Error adding movie:", err);
      return c.json({ error: "Failed to add movie." }, 500);
    }
  })

  // Route to delete a movie by its ID for the logged-in user
  .delete("/id/:id", getUser, async (c) => {
    const _id = c.req.param("id");
    const userId = c.var.user.id;

    try {
      // Delete the movie from the database for the user
      const deleteMovie = await db
        .delete(Movies)
        .where(and(eq(Movies.user_id, userId), eq(Movies._id, _id)))
        .returning();

      // Return 404 if the movie was not found
      if (!deleteMovie.length) return c.notFound();

      // Return the deletion result as JSON
      return c.json(deleteMovie);
    } catch (err: any) {
      console.error("Error deleting movie:", err);
      return c.json({ error: "Failed to delete movie." }, 500);
    }
  });

// TODO: Add tests for the endpoints
// TODO: Implement a PUT route for updating movies
