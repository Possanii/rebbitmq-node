import { env } from './application/config/env';
import app from './controller/lib/fastify';
import './controller/routes';

app.listen({ port: env.API_BASE_PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
