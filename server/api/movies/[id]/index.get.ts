const waitfor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default defineEventHandler(async (event) => {
  await waitfor(3000);
  const id = getRouterParam(event, "id");
  const movies = $fetch(
    `https://crudcrud.com/api/ad2775c75c234d8dbdab2edefb0347da/movies/${id}`
  );
  return movies;
});
