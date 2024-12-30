import { PlaceOrderDTO } from './dto/placeOrderDTO';

export interface PlaceOrderUseCase {
  createOrder(data: PlaceOrderDTO): Promise<void>;
}
