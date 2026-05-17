import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
const supabaseUrl = process.env.SUPABASE_URL;
// eslint-disable-next-line no-undef
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =============== ЗАПРОСЫ ПОЛЬЗОВАТЕЛЕЙ ======================
export const userQueries = {
	getAll: async () => {
		const { data, error } = await supabase
			.from('users')
			.select('*')

		if (error) throw error;

    return data;
	},

	add: async (newUser) => {
		const { error } = await supabase
			.from('users')
			.insert([newUser])
		
		if (error) throw error;
	},

	getUserByEmail: async (email) => {
		const { data, error } = await supabase
			.from('users')
			.select('*')
			.eq('email', email)
			.single()
		
		if (error) throw error;

		return data
	}
};

export const dessertsQueries = {
	getAll: async () => {
		const { data, error } = await supabase
			.from('desserts')
			.select('*')
		
		if (error) throw error;

		return data;
	}
	
}