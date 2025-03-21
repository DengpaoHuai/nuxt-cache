import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { getMovies, createMovie, deleteMovie } from "@/services/movies.service";
import useMovieStore from "../useMovieStore";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import Movies from "~/pages/movies.vue";

vi.mock("@/services/movies.service", () => ({
  getMovies: vi.fn(),
  createMovie: vi.fn(),
  deleteMovie: vi.fn(),
}));

describe("useMovieStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("doit récupérer la liste des films via getData()", async () => {
    (getMovies as Mock).mockResolvedValueOnce([
      { _id: "1", title: "Movie 1" },
      { _id: "2", title: "Movie 2" },
    ]);

    const store = useMovieStore();

    await store.getData();

    expect(getMovies).toHaveBeenCalledTimes(1);
    expect(store.movies).toHaveLength(2);

    /*  const component = await mountSuspended(Movies);
    expect(component.text()).toContain("Movie 1");*/
  });

  /*  it("doit créer un nouveau film via createData()", async () => {
    (createMovie as Mock).mockResolvedValueOnce({
      _id: "3",
      title: "New Movie",
      description: "Description",
      rating: "5",
    });

    const store = useMovieStore();

    await store.createData({
      title: "New Movie",
      description: "Description",
      rating: "5",
    });

    expect(createMovie).toHaveBeenCalledTimes(1);
    expect(createMovie).toHaveBeenCalledWith({
      title: "New Movie",
      description: "Description",
      rating: "5",
    });
    expect(store.movies).toHaveLength(1);
  });

  it("doit supprimer un film existant via deleteData()", async () => {
    (getMovies as Mock).mockResolvedValueOnce([
      { _id: "1", title: "Movie 1" },
      { _id: "2", title: "Movie 2" },
    ]);

    (deleteMovie as Mock).mockResolvedValueOnce({});

    const store = useMovieStore();
    await store.getData();
    expect(store.movies).toHaveLength(2);

    await store.deleteData("1");

    expect(deleteMovie).toHaveBeenCalledTimes(1);
    expect(deleteMovie).toHaveBeenCalledWith("1");
    expect(store.movies).toHaveLength(1);
  });*/
});
