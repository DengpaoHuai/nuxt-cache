import { movieSchema } from "~/schemas/movie.schema";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    movieSchema.safeParse(body)
  );

  const response = await $fetch(
    "https://crudcrud.com/api/a419eedf45f6495eaf5123b8d713dc23/movies",
    {
      method: "POST",
      body: JSON.stringify(result.data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
});
