export default function (app) {
	app.get('/index/:id', (req, reply) => {
		reply.sendFile('index.html')
	})

}