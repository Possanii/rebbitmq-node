import { env } from '@/application/config/env';
import app from './lib/fastify';
import { container } from '@/application/inversify.config';
import { TYPES } from '@/application/types';
import { CreateProduct } from '@/application/useCases/CreateProduct';
import { productSchema } from '@/application/models/Product';

app.get('/', async (request, reply) => {
  return reply.status(200).send(`server listening on ${env.API_BASE_PORT}`);
});

app.post('/product', async (request, reply) => {
  const createProduct = container.get<CreateProduct>(TYPES.CreateProduct);

  const formatted = productSchema
    .pick({ name: true, price: true })
    .parse(request.body);

  await createProduct.create(formatted);

  return reply.status(201).send();
});
