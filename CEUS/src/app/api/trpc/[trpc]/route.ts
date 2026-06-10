// src/server/.../  → handler at src/app/api/trpc/[trpc]/route.ts
  import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
  import { type NextRequest } from "next/server";

  import { appRouter } from "@/server/api/root";
  import { createTRPCContext } from "@/server/api/trpc";

  const handler = (req: NextRequest) =>
    fetchRequestHandler({
      endpoint: "/api/trpc",        // must match the client's url
      req,
      router: appRouter,            // your routers (events → Rubric, hello, …)
      createContext: () => createTRPCContext({ headers: req.headers }),
    });

  export { handler as GET, handler as POST };