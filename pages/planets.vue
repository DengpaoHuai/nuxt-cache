<script setup lang="ts">
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

const { data, error } = useFetch<PlanetResponse>("/api/planet");
const { data: movies } = useFetch<PlanetResponse>("/api/movies");
console.log(data);
</script>

<template>
  <div>
    <h1>Planets</h1>
    <div v-if="data">
      <ul>
        <li v-for="planet in data.results">
          {{ planet.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
