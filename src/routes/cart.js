import { isAuthenticated } from '../controllers/utilits.js';
import { addSet } from '../controllers/cart.js'

export default async function (app) {
	app.get('/cart', (req, reply) => {
		reply.sendFile('cart.html')
	})

	app.post('/cart/add-set/:id', async (req, reply) => {
		const { id } = req.params
		try {
			const isUser = await isAuthenticated(id)
			if (!isUser) {
				throw new Error(' Пользователя с таким id не существует')
			}
			const data = req.body;
			data.userId = id
			await addSet(data)
			
		} catch (error) {
			 console.log(error.messange)
			 throw error
		}
		

		reply.redirect('/cart')
	})
}