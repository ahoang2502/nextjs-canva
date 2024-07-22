import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("/", (c) => {
    return c.json({ user: "GET" });
  })
  .get("/:name", (c) => {
    return c.json({ name: "hello" });
  });

export default app;
