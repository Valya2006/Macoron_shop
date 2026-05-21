import { userQueries } from "../db/supabase.js";
import { generateId } from './utilits.js';

export const addUser = async (req, reply) => {
	try {
      const { name, phone, password, email } = req.body;
			const newUser = {
				id: generateId(),
				full_name: name,
				phone,
				password,
				email
			}
      await userQueries.add(newUser)

    } catch (error) {
      console.error('Ошибка получения пользователей:', error);
      return reply.code(500).send({ error: error.message });
    }
}