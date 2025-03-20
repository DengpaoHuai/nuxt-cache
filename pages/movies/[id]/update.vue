<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { movieSchema, type Movie } from "~/schemas/movie.schema"

const route = useRoute()

const fetcher = async () => (await $fetch(`/api/movies/${route.params.id}`)) as Movie
const { data, suspense } = useQuery<Movie>({
	queryKey: ["movies", route.params.id],
	queryFn: fetcher,
})

await suspense()

const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(movieSchema),
	initialValues: data?.value ?? {},
})

const router = useRouter()

const queryClient = useQueryClient()

const mutation = useMutation({
	mutationFn: (values: Omit<Movie, "_id">) =>
		$fetch(`/api/movies/${route.params.id}`, {
			method: "PUT",
			body: JSON.stringify(values),
		}),
	onMutate: (values: Movie) => {
		const previousData = queryClient.getQueryData<Movie[]>(["movies"])!

		const movies: Movie[] = previousData?.filter(movie => movie._id !== route.params.id)

		movies.push(values)

		queryClient.setQueryData<Movie[]>(["movies"], _ => movies)

		return { previousData }
	},
	onSuccess: () => {
		console.log("onSuccess")
		router.push("/movies")
	},
	onError: () => {
		console.log("onError")
	},
})

const onSubmit = handleSubmit(async values => mutation.mutateAsync(values))
</script>

<template>
	<div>
		<h1>Update</h1>

		<CustomInput name="title" label="title" />
		<CustomInput name="director" label="director" />
		<CustomInput name="producer" label="producer" />
		<button @click="onSubmit">Submit</button>
	</div>
</template>
