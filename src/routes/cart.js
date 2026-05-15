export default async function (app) {
	app.get('/cart', (req, reply) => {
		reply.sendFile('cart.html')
	})
}