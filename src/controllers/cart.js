import { cartQueries } from "../db/supabase.js";

import{ addUserToSet } from '../controllers/create-set.js'

export const addSet = async (data) => {
	const { title, items, price, isCustom, userId} = data
	if (isCustom) {
		try {
			const isAddUserToSet = await addUserToSet(title, price, items, userId)

			if (!isAddUserToSet) throw new Error('Дессерты не добавлены')

			return true
		} catch (error) {
			console.error(error.messange)
			throw error
		}
	}
}

export const getCartAll = async (userId) => {
	try {
		const data = await cartQueries.getAll(userId)

		if (!data) {
			throw new Error('Ошибка получения данных корзины (getCartAll)')
		}

		console.log('Данные получены')
		return data

	} catch (error) {
		console.error(error.messange)
		throw error
	}
}

