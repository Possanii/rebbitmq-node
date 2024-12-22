import { inject, injectable } from 'inversify';
import { IOrderRepository } from '../interfaces/repositories/IOrderRepository';
import { TYPES } from '../interfaces/types';
import { Order } from '../entities/Order';
import { PlaceOrderDTO } from '../dto/placeOrderDTO';

@injectable()
export class PlaceOrder {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: IOrderRepository
  ) {}

  async execute(data: PlaceOrderDTO): Promise<void> {
    const order = new Order(data.email, data.amount);
    await this.orderRepository.create(order);
  }
}
