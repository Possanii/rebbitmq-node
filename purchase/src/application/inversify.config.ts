import { Container } from 'inversify';
import { ILogGateway } from '../adapters/gateways/ILogGateaway';
import { TYPES } from './types';
import { ConsoleLogGateway } from '../infra/gateways/ConsoleLogGateway';
import { IPurchaseRepository } from '../adapters/repositories/IPurchaseRepository';
import { PlacePurchase } from './useCases/PlacePurchase';
import { IUserRepository } from '../adapters/repositories/IUserRepository';
import { Prisma } from '../infra/orm/prisma';
import { UserUseCase } from './useCases/User';
import { PostgresPurchaseRepository } from '../infra/repository/PostgresPurchaseRepository';
import { PostgresUserRepository } from '../infra/repository/PostgresUserRepository';
import { ICurrentORM } from '@/adapters/orm/ICurrentORM';
import { RabbitmqGateway } from '@/infra/gateways/RabbitmqGateway';
import { IMessagingGateway } from '@/adapters/gateways/IMessagingGateway';

const container = new Container();

container.bind<ILogGateway>(TYPES.Log).to(ConsoleLogGateway);
container.bind<ICurrentORM>(TYPES.Orm).to(Prisma);
container.bind<IMessagingGateway>(TYPES.Messaging).to(RabbitmqGateway);
// .onActivation(async (context, messagingGateway) => {
//   if (messagingGateway instanceof RabbitmqGateway) {
//     await messagingGateway.initialize();
//   }
//   return messagingGateway;
// });

// Repositories
container
  .bind<IPurchaseRepository>(TYPES.PurchaseRepository)
  .to(PostgresPurchaseRepository);
container
  .bind<IUserRepository>(TYPES.UserRepository)
  .to(PostgresUserRepository);

// UseCases
container.bind<PlacePurchase>(TYPES.PlacePurchase).to(PlacePurchase);
container.bind<UserUseCase>(TYPES.UserUseCase).to(UserUseCase);

export { container };
