export default defineEventHandler((event) => {
  const query = getQuery(event);
  console.log("query", query);
  const { page = 1 } = query;
  const planet = $fetch("https://swapi.dev/api/planets?page=" + page);
  return planet;
});
