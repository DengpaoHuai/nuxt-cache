import { useQuery } from "@tanstack/vue-query";
import type { Movie } from "~/schemas/movie.schema";
import { useUserSuperStore } from "~/store/useUserSuperStore";

type Filters = {
  limit: number;
};

const fetcher = async (filters: Filters) => {
  const response = await fetch(
    "https://crudcrud.com/api/ad2775c75c234d8dbdab2edefb0347da/movies?limit=" +
      filters.limit,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

const queryOptions = (filters: Filters) => ({
  queryKey: ["movies"],
  queryFn: () => fetcher(filters),
});

const useMovies = () => {
  const { user } = useUserSuperStore();

  const filters = {
    limit: user ? 50 : 10,
  };

  return useQuery<Movie[]>({
    ...queryOptions(filters),
  });
};

export default useMovies;
