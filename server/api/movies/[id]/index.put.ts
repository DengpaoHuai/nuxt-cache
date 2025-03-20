import { movieSchema } from "~/schemas/movie.schema"

export default defineEventHandler(async event => {
	const id = getRouterParam(event, "id")
	const result = await readValidatedBody(event, body => movieSchema.safeParse(body))

	console.log(result.data)

	const response = await $fetch(`https://crudcrud.com/api/ad2775c75c234d8dbdab2edefb0347da/movies/${id}`, {
		method: "PUT",
		body: JSON.stringify(result.data),
		headers: {
			"Content-Type": "application/json",
		},
	})
	return response
})
