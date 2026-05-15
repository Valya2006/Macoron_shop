export default async function (app) {
	app.get('/login', (req, reply) => {
		reply.view('login')
	})

	app.post('/login', (req, reply) => {
		reply.redirect('/index')
	})
}
