import { Container } from 'inversify';
import { TYPES } from './types';
import { Prisma } from '@/infra/database/prisma';
import { ICurrentDatabase } from '@/adapters/database/ICurrentDatabase';
import { IStockRepository } from '@/adapters/repositories/IStockRepository';
import { StockRepository } from '@/infra/repositories/StockRepository';
import { IProductRepository } from '@/adapters/repositories/IProductRepository';
import { ProductRepository } from '@/infra/repositories/ProductRepository';
import { PurchaseRegistry } from './useCases/PurchaseRegistry';
import { ConsoleLogGateway } from '@/infra/gateways/ConsoleLogGateway';
import { RabbitmqGateway } from '@/infra/gateways/RabbitmqGateway';
import { ILogGateway } from '@/adapters/gateways/ILogGateaway';
import { IMessagingGateway } from '@/adapters/gateways/IMessagingGateway';
import { Consumer } from '@/controller/consumer';
import { CreateProduct } from './useCases/CreateProduct';
import { IPurchaseRepository } from '@/adapters/repositories/IPurchaseRepository';
import { PurchaseRepository } from '@/infra/repositories/PurchaseRepository';

const container = new Container();

container.bind<ICurrentDatabase>(TYPES.Database).to(Prisma);
container.bind<ILogGateway>(TYPES.Log).to(ConsoleLogGateway);
container.bind<IMessagingGateway>(TYPES.Messaging).to(RabbitmqGateway);
container.bind<Consumer>(TYPES.Consumer).to(Consumer);

// Repositories
container.bind<IStockRepository>(TYPES.StockRepository).to(StockRepository);
container
  .bind<IProductRepository>(TYPES.ProductRepository)
  .to(ProductRepository);
container
  .bind<IPurchaseRepository>(TYPES.PurchaseRepository)
  .to(PurchaseRepository);

// UseCases
container.bind(TYPES.CreateProduct).to(CreateProduct);
container.bind(TYPES.PurchaseRegistry).to(PurchaseRegistry);

export { container };
