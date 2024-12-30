import { env } from '@/application/config/env';
import app from './lib/fastify';

app.get('/', async (request, reply) => {
  return reply.status(200).send(`server listening on ${env.API_BASE_PORT}`);
});
