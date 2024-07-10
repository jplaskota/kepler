import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";
import { fakeContent } from "../fakeContent";
import { contentSchema } from "../models/content.models";

const postContentSchema = contentSchema.omit({ id: true });

const router = new Hono()
  .get("/", (c) => {
    return c.json(fakeContent);
  })
  .get("/:id{[a-zA-Z0-9-]+}", (c) => {
    const id = c.req.param("id");
    const content = fakeContent.find((content) => content.id === id);

    if (!content) {
      return c.notFound();
    }

    return c.json({ content });
  })
  .post("/", zValidator("json", postContentSchema), async (c) => {
    const content = await c.req.valid("json");
    const newContent = { id: uuidv4(), ...content };

    fakeContent.push(newContent);

    c.status(201);
    return c.json(newContent);
  })
  .delete("/:id{[a-zA-Z0-9-]+}", (c) => {
    const id = c.req.param("id");
    const index = fakeContent.findIndex((content) => content.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedContent = fakeContent.splice(index, 1)[0];
    return c.json({ content: deletedContent });
  });

export default router;

//TODO tests
