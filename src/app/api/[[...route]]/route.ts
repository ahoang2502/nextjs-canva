import { Hono } from "hono";
import { handle } from "hono/vercel";

import images from "./images";
import ai from "./ai";
import users from "./users";

// Revert to "edge" if run on the edge
export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app
  .route("/ai", ai)
  .route("/images", images)
  .route("/users", users);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETe = handle(app);

export type AppType = typeof routes;
