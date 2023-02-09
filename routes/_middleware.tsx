import { MiddlewareHandler } from "$fresh/server.ts";
import env from "@/env.ts";

const protectedPaths = ["/submissions"];

export const handler: MiddlewareHandler = (req, ctx) => {
  const url = new URL(req.url);
  for (const protectedPath of protectedPaths) {
    if (
      url.pathname == protectedPath &&
      url.searchParams.get("secret") != env.SECRET
    ) {
      return new Response();
    }
  }
  return ctx.next();
};
