import { loginUser } from "../controllers/login.js"

export default async function (app) {
	app.get('/login', (req, reply) => {
		reply.view('login', { errors: [] })
	})

	app.post('/login', async (req, reply) => {
		try {
			const user = await loginUser(req)
			console.log(user)
			reply.redirect(`/index/${user.id}`)
		} catch (error) {
			 console.error('Ошибка входа:', error.message);
       return reply.view('login', { errors: [error.message] });
		}
	})
}
