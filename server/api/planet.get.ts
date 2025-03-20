export default defineEventHandler((event) => {
  const planet = $fetch("https://swapi.dev/api/planets");
  return planet;
});
