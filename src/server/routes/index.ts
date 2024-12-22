import app from '../lib/fastify';

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});
