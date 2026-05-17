import { getDesserts } from "../controllers/create-set.js"

export default async function (app) {
	app.get('/create-set', (req, reply) => {
		reply.sendFile('create-set.html')
	})

	app.get('/create-set/desserts', async (req, reply) => {
		try {
			const data = await getDesserts()
			if (data) {
				return data
			} 
		} catch (error) {
			  console.error('Ошибка в роуте:', error);
        return reply.code(500).send({ error: 'Ошибка загрузки десертов' });
		}

	})
}