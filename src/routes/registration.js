import { addUser } from "../controllers/registration.js";
import { validator } from "../controllers/validator.js";

export default async function (app) {
	app.get('/registration', (req, res) => {
		res.view('registration', { errors: []})
	})

	app.post('/registration', async (req, reply) => {
			const { name, password, phone, email } = req.body
			const errors = validator.validatorUser({name, password, phone, email})
      console.log(errors)
			if (errors.length > 0) {
				return reply.view('registration', { errors })
			}
      
			try {
				await addUser(req, reply)
			  return reply.redirect('/login')
			} catch (error) {
				console.log('Ошибка при создание пользователя ', error)
			}
	})
}