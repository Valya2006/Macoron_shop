export default async function (app) {
	app.get('/product-card/:title', (req, reply) => {
		reply.sendFile('product-card.html')
	})

}