const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  await wait(2000);
  throw createError({
    statusCode: 400,
    statusMessage: "ID should be an integer",
  });

  await $fetch(
    `https://crudcrud.com/api/a419eedf45f6495eaf5123b8d713dc23/movies/${id}`,
    {
      method: "DELETE",
    }
  );

  return "ok";
});
