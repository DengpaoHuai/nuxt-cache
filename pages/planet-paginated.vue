<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type PlanetResponse = {
  results: Planet[];
};

const page = ref(1);

const fetcher = async (page: number) =>
  (await $fetch("/api/planet?page=" + page)) as PlanetResponse;

const { data, suspense } = useQuery<PlanetResponse>({
  queryKey: ["movies", page],
  queryFn: () => fetcher(page.value),
  staleTime: 1000,
});

await suspense();
</script>

<template>
  <div>
    <h1>Home</h1>
    <div v-if="data">
      <ul>
        <li v-for="planet in data.results">
          {{ planet.name }}
        </li>
      </ul>
    </div>
    <button @click="page--">prev</button>
    <span>{{ page }}</span>
    <button @click="page++">next</button>
  </div>
</template>
