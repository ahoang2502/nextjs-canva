import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

import ai from "./ai";
import images from "./images";
import users from "./users";

import authConfig from "@/auth.config";

// Revert to "edge" if run on the edge
export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig
  }
}

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig))

const routes = app
  .route("/ai", ai)
  .route("/images", images)
  .route("/users", users);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETe = handle(app);

export type AppType = typeof routes;
