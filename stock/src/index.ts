import { env } from './application/config/env';
import { container } from './application/inversify.config';
import { TYPES } from './application/types';
import { Consumer } from './controller/consumer';
import app from './controller/lib/fastify';
import './controller/routes';

async function start() {
  const consumer = container.get<Consumer>(TYPES.Consumer);
  await consumer.initialize();

  app.listen({ port: env.API_BASE_PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
  });
}

start();
