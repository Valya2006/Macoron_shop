import { userQueries } from "../db/supabase.js";

export const loginUser = async (req) => {
	const { email, password } = req.body;

	const user = await userQueries.getUserByEmail(email);

	if (!user || user.password !== password) {
		throw new Error('Проверьте логин или пароль')
	} else {
		return user;
	}
}