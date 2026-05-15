export default async function (app) {
	app.get('/registration', (req, res) => {
		res.view('registration')
	})

	app.post('/registration', (req, reply) => {
		reply.redirect('/index')
	})
}