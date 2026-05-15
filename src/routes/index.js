export default function (app) {
	app.get('/index', (req, reply) => {
		reply.sendFile('index.html')
	})

}