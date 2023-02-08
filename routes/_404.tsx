import { Handler } from "$fresh/server.ts";

export const handler: Handler = (req) => {
  return Response.redirect(new URL("/", req.url));
};
