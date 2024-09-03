import { verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";

import { stripe } from "@/lib/stripe";

const app = new Hono().post("/checkout", verifyAuth(), async (c) => {
  const auth = c.get("authUser");

  if (!auth.token?.id) return c.json({ error: "Unauthorized" });
});

export default app;
