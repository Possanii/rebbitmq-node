import { Container } from 'inversify';
import { ILogGateway } from '../interfaces/gateways/ILogGateaway';
import { TYPES } from '../interfaces/types';
import { ConsoleLogGateway } from '../gateways/ConsoleLogGateway';
import { IOrderRepository } from '../interfaces/repositories/IOrderRepository';
import { PostgresOrderRepository } from '../repository/PostgresOrderRepository';
import { PlaceOrder } from '../useCases/PlaceOrder';

const container = new Container();

container.bind<ILogGateway>(TYPES.Log).to(ConsoleLogGateway);
container
  .bind<IOrderRepository>(TYPES.OrderRepository)
  .to(PostgresOrderRepository);
container.bind<PlaceOrder>(TYPES.PlaceOrder).to(PlaceOrder);

export { container };
