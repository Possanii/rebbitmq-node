import { placePurchaseDTOSchema } from '../../domain/dto/placePurchaseDTO';
import { userSchema } from '../../application/models/User';
import { TYPES } from '../../application/types';
import { container } from '../../application/inversify.config';
import { UserUseCase } from '../../application/useCases/User';
import { PlacePurchase } from '../../application/useCases/PlacePurchase';
import { env } from '../../application/config/env';
import app from '../lib/fastify';

app.get('/', async (request, reply) => {
  return reply.status(200).send(`server listening on ${env.API_BASE_PORT}`);
});

app.post('/', async (request, reply) => {
  const placePurchase = container.get<PlacePurchase>(TYPES.PlacePurchase);

  const formatted = placePurchaseDTOSchema.parse(request.body);

  await placePurchase.createPurchase(formatted);

  return reply.status(201).send();
});

app.post('/user', async (request, reply) => {
  const createUser = container.get<UserUseCase>(TYPES.UserUseCase);

  const user = userSchema.pick({ name: true, email: true }).parse(request.body);

  const userCreated = await createUser.create(user);

  return reply.code(201).send({ message: 'User created', user: userCreated });
});

app.get('/user/:id', async (request, reply) => {
  const createUser = container.get<UserUseCase>(TYPES.UserUseCase);

  const { id } = userSchema.pick({ id: true }).parse(request.params);

  const users = await createUser.findOne(id);

  return reply.code(200).send(users);
});

app.patch('/user/:id', async (request, reply) => {
  const createUser = container.get<UserUseCase>(TYPES.UserUseCase);

  const { id } = userSchema.pick({ id: true }).parse(request.params);
  const user = userSchema.pick({ name: true, email: true }).parse(request.body);

  const users = await createUser.findOneAndUpdate({ id, ...user });

  return reply.code(200).send(users);
});

app.delete('/user/:id', async (request, reply) => {
  const createUser = container.get<UserUseCase>(TYPES.UserUseCase);

  const { id } = userSchema.pick({ id: true }).parse(request.params);

  await createUser.findOneAndDelete(id);

  return reply.code(204).send();
});
