import { defineStore } from "pinia";

const usePeopleStore = defineStore("usePeopleStore", () => {
  const people = ref([]);
  const people1 = ref([]);

  const isPeopleLoading = ref(false);

  const getPeople = async () => {
    $fetch("https://swapi.dev/api/people")
      .then((response) => {
        people.value = response.results;
      })
      .catch((error: unknown) => {
        //narrowing the type of error
        if (error instanceof Error) {
          console.error(error.message);
        } else if (typeof error === "string") {
          console.error(error);
        } else {
          console.error("An error occurred");
        }
      });
  };

  onMounted(() => {
    // https://swapi.dev/api/people
    getPeople();
  });

  return {
    people,
    people1,
    refetch: getPeople,
    isPeopleLoading,
  };
});

export default usePeopleStore;
