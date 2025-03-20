<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import type { Movie } from "~/schemas/movie.schema"

const fetcher = async () => (await $fetch("/api/movies")) as Movie[]

const { data, suspense } = useQuery<Movie[]>({
	queryKey: ["movies"],
	queryFn: fetcher,
	staleTime: 9999999999999999,
})

await suspense()

const queryClient = useQueryClient()

const mutation = useMutation({
	mutationFn: (id: string) =>
		$fetch("/api/movies/" + id, {
			method: "DELETE",
		}),
	onMutate: (id: string) => {
		const previousData = queryClient.getQueryData<Movie[]>(["movies"])

		queryClient.setQueryData<Movie[]>(["movies"], old => old?.filter(movie => movie._id !== id))

		return { previousData }
	},
	onSuccess: () => {
		console.log("onSuccess")
		queryClient.invalidateQueries({ queryKey: ["movies"] })
	},
	onError: (state, error, context) => {
		console.log("onError")
		queryClient.setQueryData<Movie[]>(["movies"], context?.previousData)
	},
})
</script>

<template>
	<div>
		<h1>Movies</h1>
		<NuxtLink to="/movies/create">Create</NuxtLink>
		<div v-if="data">
			<ul>
				<li v-for="movie in data">
					<p>
						{{ movie.title }}
						<button @click="mutation.mutateAsync(movie._id)">Delete</button>
						<NuxtLink :to="`/movies/${movie._id}/update`">Update</NuxtLink>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>
