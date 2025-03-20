const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default defineEventHandler(async event => {
	const id = getRouterParam(event, "id")
	await wait(2000)
	throw createError({
		statusCode: 400,
		statusMessage: "ID should be an integer",
	})

	await $fetch(`https://crudcrud.com/api/ad2775c75c234d8dbdab2edefb0347da/movies/${id}`, {
		method: "DELETE",
	})

	return "ok"
})
