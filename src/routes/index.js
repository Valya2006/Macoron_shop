import getSweetSets from "../controllers/index.js"

export default function (app) {
	app.get('/index/sets', async (req, reply) => {
		try {
			const data = await getSweetSets();
			if (data) {
				return data
			}
		} catch (error) {
				console.error('Ошибка в роуте:', error);
        return reply.code(500).send({ error: 'Ошибка загрузки сетов' });
		}
	})

	app.get('/index/:id', (req, reply) => {
		reply.sendFile('index.html')
	})

}