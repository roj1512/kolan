import { loadSync } from "std/dotenv/mod.ts";
import { z } from "zod";

if (Deno.env.get("DEBUG")) {
  loadSync({ export: true });
}

export default z.object({
  MONGODB_URI: z.string(),
  SECRET: z.string(),
}).parse(Deno.env.toObject());
