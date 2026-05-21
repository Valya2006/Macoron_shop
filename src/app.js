import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import formbody from '@fastify/formbody';
import cookie from '@fastify/cookie';
import view from '@fastify/view';
import pug from 'pug';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify({loger: true});
const supabaseUrl = process.env.SUPABASE_URL;
// eslint-disable-next-line no-undef
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
console.log(supabaseUrl, supabaseAnonKey, "hel")
await app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/'
});

await app.register(formbody)
await app.register(cookie)

await app.register(view, {
  engine: { pug: pug },
  root: path.join(__dirname, 'views'),
  viewExt: 'pug'
});

app.register(async (app) => {
	await app.register(import('./routes/login.js'))
	await app.register(import('./routes/registration.js'))
	await app.register(import('./routes/index.js'))
	await app.register(import('./routes/cart.js'))
	await app.register(import('./routes/create-set.js'))
	await app.register(import('./routes/product-card.js'))
})

app.get('/', (req, res) => {
		res.redirect('/login')
})


const start = async () => {
    try {
        // eslint-disable-next-line no-undef
        await app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    } catch (err) {
        app.log.error(err);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
};

start();