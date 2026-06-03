import { z } from "zod";

import { publicProcedure } from "@/server/api/trpc";

/**
 * Example procedure — a minimal reference for adding new tRPC endpoints.
 *
 * A procedure is a single endpoint. The pieces below are the common building
 * blocks you'll reuse for real routers (see `../events` for a fuller example):
 *
 *  - `publicProcedure` — no auth required. Use a protected procedure instead
 *    if the endpoint needs the caller to be signed in.
 *  - `.input(schema)`  — validates/parses the client payload with Zod. The
 *    parsed value is available as `input` and is fully typed.
 *  - `.query(...)`     — for reads. Use `.mutation(...)` for writes.
 */
export const helloProcedure = publicProcedure
  .input(z.object({ text: z.string() }))
  .query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  });
