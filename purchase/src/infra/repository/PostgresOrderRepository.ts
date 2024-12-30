import { inject, injectable } from 'inversify';
import { IOrderRepository } from '../../adapters/repositories/IOrderRepository';
import { ILogGateway } from '../../adapters/gateways/ILogGateaway';
import { TYPES } from '../../application/types';
import { Order } from '../../application/models/Order';

@injectable()
export class PostgresOrderRepository implements IOrderRepository {
  constructor(@inject(TYPES.Log) private logGateway: ILogGateway) {}

  create(order: Order): Promise<void> {
    // Persist the order in a Postgres database
    this.logGateway.log({ message: 'Order created:', order });

    return Promise.resolve();
  }
}
