import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { Series } from "../db/schema/series.schema";
import { getUser } from "../kinde";
import type { TSeries, TSeriesSearch } from "../models/series.model";
import { InsertSeriesSchema } from "../models/series.model";
import { fetchSeriesDetails } from "../services/tmdb.services";

export const seriesRoute = new Hono()
  // Route to fetch all series for a user
  .get("/", getUser, async (c) => {
    const userId = c.var.user.id;

    try {
      // Query the database for series belonging to the user
      const series = await db
        .select()
        .from(Series)
        .where(eq(Series.user_id, userId));

      // Return 404 if no series are found
      if (!series.length) return c.notFound();

      // Return the list of series as JSON
      return c.json(series);
    } catch (err: any) {
      console.error("Error fetching series list:", err);
      return c.json({ error: "Failed to fetch series list." }, 500);
    }
  })

  // Route to fetch a specific series by its ID
  .get("/id/:id", getUser, async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    try {
      // Check if the series exists in the database for the user
      const seriesExist = await db
        .select()
        .from(Series)
        .where(and(eq(Series.user_id, userId), eq(Series._id, id)));

      // Return 404 if the series is not found
      if (!seriesExist.length) return c.notFound();

      const seriesDetails = await fetchSeriesDetails(seriesExist[0].tmdb_id);

      return c.json({
        ...seriesDetails,
        _id: seriesExist[0]._id,
        added_date: seriesExist[0].added_date,
      });

    } catch (err: any) {
      console.error("Error fetching series by ID:", err);
      return c.json({ error: err.message || "Failed to fetch series" }, 500);
    }
  })

  // Route to add a new series for the logged-in user
  .post("/", getUser, zValidator("json", InsertSeriesSchema), async (c) => {
    const series = c.req.valid("json");
    const userId = c.var.user.id;

    try {
      // Check if the series already exists in the database
      const existingContent = await db
        .select()
        .from(Series)
        .where(and(eq(Series.user_id, userId), eq(Series.tmdb_id, series.tmdb_id)));

      // Return 409 response if the series already exists
      if (existingContent.length) return c.text("Series already exists.", 409);

      try {
        // Insert the new series into the database
        const results = await db.insert(Series).values({
          ...series,
          user_id: userId,
        });

        // Return the inserted series data as JSON
        return c.json(results, 201);
      } catch (err: any) {
        console.error("Error inserting series:", err);
        return c.json(
          { error: "Failed to insert series into the database." },
          500
        );
      }
    } catch (err: any) {
      console.error("Error checking for existing series:", err);
      return c.json({ error: "Failed to check for existing series." }, 500);
    }
  })

  // Route to delete a series by its ID for the logged-in user
  .delete("/id/:id", getUser, async (c) => {
    const id = c.req.param("id");
    const userId = c.var.user.id;

    try {
      // Delete the series from the database for the user
      const deleteSeries = await db
        .delete(Series)
        .where(and(eq(Series.user_id, userId), eq(Series._id, id)))
        .returning();

      // Return 404 if the series was not found
      if (!deleteSeries.length) return c.notFound();

      // Return the deleted result as JSON
      return c.json(deleteSeries);
    } catch (err: any) {
      console.error("Error deleting series:", err);
      return c.json({ error: "Failed to delete series." }, 500);
    }
  });

// TODO: Add tests for the endpoints
// TODO: Implement a PUT route for updating series
