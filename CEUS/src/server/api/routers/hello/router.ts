import { createTRPCRouter } from "@/server/api/trpc";

import { helloProcedure } from "./procedures";

/**
 * Example router — groups related procedures under one namespace.
 *
 * Each key becomes a path segment on the client, so `hello: helloProcedure`
 * is callable as `api.hello.hello.useQuery({ text: "world" })`.
 *
 * To add a new router of your own:
 *   1. Create a folder under `server/api/routers/<name>/` with
 *      `procedures.ts`, `router.ts`, and `index.ts` (mirror this one).
 *   2. Re-export it from `server/api/routers/index.ts`.
 *   3. Register it on `appRouter` in `server/api/root.ts`.
 */
export const helloRouter = createTRPCRouter({
  hello: helloProcedure,
});
