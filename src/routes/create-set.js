import { getDesserts, getDessertsCount } from "../controllers/create-set.js"

export default async function (app) {
	app.get('/create-set', (req, reply) => {
		reply.sendFile('create-set.html')
	})

	app.get('/create-set/desserts', async (req, reply) => {
		const { page, limit } = req.query
		const next = parseInt(limit * page); // 1 * 4 = 4
		const prev = parseInt(next - limit); // 4 - 4 = 0
		console.log(page, limit, prev, next)
		const data = {}

		try {
			const desserts = await getDesserts(prev, next - 1) // получаем массив дессертов
			const maxCountDesserts = await getDessertsCount() // получаем общее количество дессертов
			const maxPageDesserts =  Math.ceil(parseInt(maxCountDesserts) / parseInt(limit)) // высчитываем максимальное количество страниц
			if (desserts) {
				data.desserts = desserts
				data.maxPageDesserts = maxPageDesserts
				console.log(data)
				return data
			} 
		} catch (error) {
			  console.error('Ошибка в роуте:', error);
        return reply.code(500).send({ error: 'Ошибка загрузки десертов' });
		}

	})
}