import { sweetSets } from "../db/supabase.js";

export default async () => {
	try {
		const data = await sweetSets.getAll()
		return data;
	} catch (error) {
		console.error('Ошибка в контроллер getSweetSets')
		throw error
	}
}