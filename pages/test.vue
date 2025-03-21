<script setup lang="ts">
import useErrorStore from "~/store/useErrorStore";

const { data } = useAsyncData("movies", async () => {
  useNuxtApp().$httpClient("/movies");
});

const counter = ref(0);

definePageMeta({
  title: "Home",
  layout: "app-layout",
});

const { errorTitle, displayError } = storeToRefs(useErrorStore());
</script>

<template>
  <div>
    <h1>Home</h1>
    <div>{{ counter }}</div>
    <button @click="counter++">Increment</button>
    <NuxtLink to="/demo">Planets</NuxtLink>
    <div v-if="errorTitle">{{ errorTitle }}</div>
    <div v-if="data">
      <ul>
        <li v-for="movie in data">
          {{ movie.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
