import { PlacePurchaseDTO } from '@/domain/dto/placePurchaseDTO';

export interface IPurchaseRepository {
  create(data: PlacePurchaseDTO): Promise<string>;
}
