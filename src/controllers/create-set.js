import { dessertsQueries } from "../db/supabase.js";

export const getDesserts = async () => {
	try {
		const desserts = await dessertsQueries.getAll()
		return desserts;

	} catch (error) {
		console.error('Ошибка в контроллере getDesserts:', error);
    throw error;

	}
}