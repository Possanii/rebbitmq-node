import { PlacePurchaseDTO } from './dto/placePurchaseDTO';

export interface PlacePurchaseUseCase {
  createPurchase(data: PlacePurchaseDTO): Promise<void>;
}
