<script setup lang="ts">
import usePeopleStore from "~/store/usePeopleStore";

const { people } = storeToRefs(usePeopleStore());
const { refetch } = usePeopleStore();

defineRouteRules({
  prerender: true,
});
</script>

<template>
  <div>
    <h1>Home</h1>
    <NuxtLink to="/planets">Planets</NuxtLink>

    <div v-for="person in people" :key="person.name">
      {{ person.name }}
    </div>
  </div>
</template>
