export default async function (app) {
	app.get('/cart', (req, reply) => {
		reply.sendFile('cart.html')
	})

	app.post('/cart/add-set', (req, reply) => {
		console.log('Тело запроса:', req.body);

		reply.redirect('/cart')
	})
}