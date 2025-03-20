export default defineEventHandler((event) => {
  const movies = $fetch(
    "https://crudcrud.com/api/a419eedf45f6495eaf5123b8d713dc23/movies"
  );
  return movies;
});
