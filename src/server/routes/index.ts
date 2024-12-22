import { placeOrderDTOSchema } from '../../application/dto/placeOrderDTO';
import { TYPES } from '../../application/interfaces/types';
import { container } from '../../application/lib/inversify.config';
import { PlaceOrder } from '../../application/useCases/PlaceOrder';
import app from '../lib/fastify';

app.post('/', async (request, reply) => {
  const placeOrder = container.get<PlaceOrder>(TYPES.PlaceOrder);

  const formatted = placeOrderDTOSchema.parse(request.body);

  await placeOrder.execute(formatted);

  return reply.status(201).send();
});
