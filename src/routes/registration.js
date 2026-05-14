export default async function (app, options) {
	app.get('/registration', (req, res) => {
		res.view('registration')
	})
}