import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { Movies, insertMoviesSchema } from "../db/schema/movies.schema";
import { getUser } from "../kinde";
import type { TMovie, TMovieSearch } from "../models/movie.model";

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

      // Return 404 if no movies are found
      if (!movies.length) return c.notFound();

      // Return the list of movies as JSON
      return c.json(movies);
    } catch (err: any) {
      console.error("Error fetching movies list:", err);
      return c.json({ error: "Failed to fetch movies list." }, 500);
    }
  })
  // Route to fetch a specific movie by its ID
  .get("/:id", getUser, async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    try {
      // Check if the movie exists in the database for the user
      const movieExist = await db
        .select()
        .from(Movies)
        .where(and(eq(Movies.user_id, userId), eq(Movies.id, id)));

      // Return 404 if the movie is not found
      if (!movieExist.length) return c.notFound();

      try {
        // Fetch additional movie details from API
        const movieDetails: TMovieSearch = await fetch(
          "/search/movie/id/" + id
        ).then((res) => res.json());

        // Prepare the movie data to include database information
        const preparedMovieData: TMovie = {
          ...movieDetails,
          _id: movieExist[0]._id,
          added_date: movieExist[0].added_date,
        };

        // Return the movie details as JSON
        return c.json(preparedMovieData);
      } catch (err: any) {
        console.error("Error fetching movie details:", err);
        return c.json(
          { error: "Failed to fetch movie details from external API." },
          500
        );
      }
    } catch (err: any) {
      console.error("Error fetching movie details:", err);
      return c.json({ error: "Failed to fetch movie details." }, 500);
    }
  })
  // Route to add a new movie for the logged-in user
  .post("/", getUser, zValidator("json", insertMoviesSchema), async (c) => {
    const movie = c.req.valid("json");
    const userId = c.var.user.id;

    try {
      // Check if the movie already exists in the database
      const movieExist = await db
        .select()
        .from(Movies)
        .where(and(eq(Movies.user_id, userId), eq(Movies.id, movie.id)));

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
    const id = c.req.param("id");
    const userId = c.var.user.id;

    try {
      // Delete the movie from the database for the user
      const deleteMovie = await db
        .delete(Movies)
        .where(and(eq(Movies.user_id, userId), eq(Movies.id, id)))
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
