import { Order } from '../../application/models/Order';

export interface IOrderRepository {
  create(order: Order): Promise<void>;
}
