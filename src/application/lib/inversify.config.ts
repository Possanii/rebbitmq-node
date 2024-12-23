import { Container } from 'inversify';
import { ILogGateway } from '../interfaces/gateways/ILogGateaway';
import { TYPES } from '../interfaces/types';
import { ConsoleLogGateway } from '../gateways/ConsoleLogGateway';
import { IOrderRepository } from '../interfaces/repositories/IOrderRepository';
import { PostgresOrderRepository } from '../repository/PostgresOrderRepository';
import { PlaceOrder } from '../useCases/PlaceOrder';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import { PostgresUserRepository } from '../repository/PostgresUserRepository';
import { IORM } from '../interfaces/orm/IORM';
import { Prisma } from './prisma';
import { PrismaClient } from '@prisma/client';
import { UserUseCase } from '../useCases/User';

const container = new Container();

container.bind<ILogGateway>(TYPES.Log).to(ConsoleLogGateway);
container.bind<IORM<PrismaClient>>(TYPES.Orm).to(Prisma);

// Repositories
container
  .bind<IOrderRepository>(TYPES.OrderRepository)
  .to(PostgresOrderRepository);
container
  .bind<IUserRepository>(TYPES.UserRepository)
  .to(PostgresUserRepository);

// UseCases
container.bind<PlaceOrder>(TYPES.PlaceOrder).to(PlaceOrder);
container.bind<UserUseCase>(TYPES.UserUseCase).to(UserUseCase);

export { container };
