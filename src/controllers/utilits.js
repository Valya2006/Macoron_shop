import crypto from 'crypto';
import { userQueries } from "../db/supabase.js";

export const generateId = () => {
    return crypto.randomBytes(16).toString('hex');
}

export const isAuthenticated = async (id) => {
	 try {
		const user = await userQueries.getUserById(id);
		if (!user) {
			throw Error('Пользователя с таким id не существует')
		}
		console.log('Пользователь существует')
		return true
	 } catch (error) {
		console.error(error.messange)
		throw error
	 }
}

