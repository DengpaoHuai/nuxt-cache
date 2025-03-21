import { movieSchema } from "~/schemas/movie.schema"

export default defineEventHandler(async event => {
	const result = await readValidatedBody(event, body => movieSchema.safeParse(body))

	const response = await $fetch("https://crudcrud.com/api/ad2775c75c234d8dbdab2edefb0347da/movies", {
		method: "POST",
		body: JSON.stringify(result.data),
		headers: {
			"Content-Type": "application/json",
		},
	})
	return response
})
