import { inject, injectable } from 'inversify';
import { IOrderRepository } from '../../adapters/repositories/IOrderRepository';
import { TYPES } from '../types';
import { Order } from '../models/Order';
import { PlaceOrderDTO } from '../../domain/dto/placeOrderDTO';
import { PlaceOrderUseCase } from '../../domain/PlaceOrderUseCase';
import { IMessagingGateway } from '@/adapters/gateways/IMessagingGateway';

@injectable()
export class PlaceOrder implements PlaceOrderUseCase {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: IOrderRepository,
    @inject(TYPES.Messaging)
    private messaging: IMessagingGateway
  ) {}

  async createOrder(data: PlaceOrderDTO): Promise<void> {
    const order = new Order(data.email, data.amount);
    await this.orderRepository.create(order);

    await this.messaging.initialize();
    await this.messaging.publishInQueue('purchase', JSON.stringify(order));
  }
}
