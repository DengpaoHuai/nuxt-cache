import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(8, "minimum 8").nonempty(),
  director: z.string().nonempty(),
  producer: z.string().nonempty(),
});

export type Movie = z.infer<typeof movieSchema> & { _id: string };
