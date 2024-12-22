import { inject, injectable } from 'inversify';
import { Order } from '../entities/Order';
import { IOrderRepository } from '../interfaces/repositories/IOrderRepository';
import { TYPES } from '../interfaces/types';
import { ILogGateway } from '../interfaces/gateways/ILogGateaway';

@injectable()
export class PostgresOrderRepository implements IOrderRepository {
  constructor(@inject(TYPES.Log) private logGateway: ILogGateway) {}

  create(order: Order): Promise<void> {
    // Persist the order in a Postgres database
    this.logGateway.log({ message: 'Order created:', order });

    return Promise.resolve();
  }
}
