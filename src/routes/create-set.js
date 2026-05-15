export default async function (app) {
	app.get('/create-set', (req, reply) => {
		reply.sendFile('create-set.html')
	})
}