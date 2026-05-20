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
	},

	getUserById: async (id) => {
		const { data, error } = await supabase
			.from('users')
			.select('*')
			.eq('id', id)
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
	},

	getLimit: async (begin, end) => {
		const { data, error } = await supabase
			.from('desserts')
			.select('*')
			.range(begin, end)

		if (error) throw error;

		return data;
	},

	getCont: async () => {
		const { count, error } = await supabase
    .from('desserts')
    .select('*', { count: 'exact', head: true });

		if (error) throw error;

		return count;
	},

	getDessertByTitle: async (title) => {
		const { data, error } = await supabase
			.from('desserts')
			.select('*')
			.eq('title', title)
			.single()
		
		if (error) throw error

		console.log('Дессерт успешно найден')
		return data

	}
	
}

export const sweetSets = {
	getAll: async () => {
		const { data, error } = await supabase
			.from('sweet_sets')
			.select('*')
	
			if (error) throw error;

			return data;
		}
}

export const userSetsQueries = {
	add: async (body) => {
		const { error } = await supabase
			.from('user_sets')
			.insert([{
				title: body.title,
				price: body.price,
				user_id: body.userId
			}])
			.select()
		
		if (error) {
			console.error('Ошибка добавления пользовательского набора')
			throw error
		} else {
			console.log('Набор успешно добавлен')
			return true
		}
	},

	getSetById: async (userId, title) => {
		const { data, error } = await supabase
			.from('user_sets')
			.select('*')
			.eq('user_id', userId)
			.eq('title', title)
			.single()
		
			if (error) throw error

			console.log('Пользовательский набор найден')
			return data
	}
}

export const userSetDessertsQueries = {
	add: async (body) => {
		const { error } = await supabase
			.from('users_set_desserts')
			.insert([{
				quantity: body.quantity,
				user_set_id: body.idUserSet,
				deserts_id: body.idDessert
			}])
			.select()

			if (error) {
			console.error('Ошибка добавления дессерта в пользовательский набор')
			throw error

		} else {
			console.log('Дессерт успешно добавлен')
			return true
		}
	}
}

