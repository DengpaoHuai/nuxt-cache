<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { movieSchema } from "~/schemas/movie.schema";

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(movieSchema),
});

const router = useRouter();

const mutation = useMutation({
  mutationFn: (values) =>
    $fetch("/api/movies", {
      method: "POST",
      body: JSON.stringify(values),
    }),
  onMutate: () => {
    console.log("onMutate");
  },
  onSuccess: () => {
    console.log("onSuccess");
    router.push("/movies");
  },
  onError: () => {
    console.log("onError");
  },
});

const onSubmit = handleSubmit(async (values) => mutation.mutateAsync(values));
</script>

<template>
  <div>
    <h1>Create</h1>

    <CustomInput name="title" label="title" />
    <CustomInput name="director" label="director" />
    <CustomInput name="producer" label="producer" />
    <button @click="onSubmit">Submit</button>
  </div>
</template>
