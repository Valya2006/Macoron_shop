import { isAuthenticated } from '../controllers/utilits.js';
import { addSet, getCartAll } from '../controllers/cart.js'

export default async function (app) {
	app.get('/cart', (req, reply) => {
		reply.sendFile('cart.html')
	})

	app.post('/api/cart/add-set/:id', async (req, reply) => {
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
			 console.log(error)
			 throw error
		}
		

		reply.redirect('/cart')
	})

	app.get('/api/card/:id', async (req, reply) => {
		const { id } = req.params
		 try {
			const data = await getCartAll(id)

			if (!data) {
				throw new Error('Ошибка получения данных (роут)')
			}

			return data
		 } catch (error) {
				console.log(error)
		 }
	})
}