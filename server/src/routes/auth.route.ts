import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { Movies } from "../db/schema/movies.schema";
import { Series } from "../db/schema/series.schema";
import { getUser, kindeClient, sessionManager } from "../kinde";

export const authRoute = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  //get called every time we login or register
  .get("/callback", async (c) => {
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/me", getUser, async (c) => {
    const user = c.var.user;
    return c.json({ user });
  })
  .delete("/clearLibrary", getUser, async (c) => {
    const userId = c.var.user.id;

    try {
      // Delete all movies for the user
      await db.delete(Movies).where(eq(Movies.user_id, userId));
      // Delete all series for the user
      await db.delete(Series).where(eq(Series.user_id, userId));

      return c.json({ message: "Library cleared successfully" });
    } catch (err: any) {
      console.error("Error clearing library:", err);
      return c.json({ error: "Failed to clear library" }, 500);
    }
  });
