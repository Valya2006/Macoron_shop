import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { supabase } from './db/supabase.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify();

fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/'
});

fastify.get('/api/test', async (req, reply) => {
    try {
        console.log('1. Запрос к Supabase...');
        const { data, error } = await supabase
            .from('test_items')
            .select('*');
        
        console.log('2. Получили ответ');
        
        if (error) {
            console.log('3. Ошибка Supabase:', error);
            return reply.code(500).send({ error: error.message });
        }
        
        console.log('4. Успех! Данные:', data);
        return { success: true, items: data };
    } catch (err) {
        console.log('5. Исключение:', err);
        return reply.code(500).send({ error: err.message, stack: err.stack });
    }
});

// Запуск
const start = async () => {
    try {
        // eslint-disable-next-line no-undef
        await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
        console.log('Сервер запущен на http://localhost:3000');
        console.log('Тест БД: http://localhost:3000/api/test');
    } catch (err) {
        fastify.log.error(err);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
};

start();