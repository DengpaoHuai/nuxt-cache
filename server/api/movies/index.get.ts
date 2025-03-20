export default defineEventHandler(event => {
	const movies = $fetch("https://crudcrud.com/api/ad2775c75c234d8dbdab2edefb0347da/movies")
	return movies
})
