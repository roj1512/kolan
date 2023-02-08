import { z } from "zod";

export const zId = z.string().regex(/^[a-f0-9]{24}$/);

export const zTerm = z
  .string()
  .max(100);

export const zDefinition = z.string().max(4096);
