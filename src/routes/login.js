export default async function (app, options) {
	app.get('/login', (req, reply) => {
		reply.view('login')
	})
}
