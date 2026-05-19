import { dessertsQueries } from "../db/supabase.js";

export const getDesserts = async (prev, next) => {
	try {
		const desserts = await dessertsQueries.getLimit(prev, next)
		return desserts;

	} catch (error) {
		console.error('Ошибка в контроллере getDesserts:', error);
    throw error;

	}
}

export const getDessertsCount = async () => {
	try {
		const countDessrts = await dessertsQueries.getCont()
		return countDessrts;
	} catch (error) {
		console.error('Ошибка в контроллере getDessertsCount:', error);
    throw error;
	}
}