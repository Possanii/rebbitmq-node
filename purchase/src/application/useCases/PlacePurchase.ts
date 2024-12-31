import { inject, injectable } from 'inversify';
import { IPurchaseRepository } from '../../adapters/repositories/IPurchaseRepository';
import { TYPES } from '../types';
import { PlacePurchaseDTO } from '../../domain/dto/placePurchaseDTO';
import { PlacePurchaseUseCase } from '../../domain/PlacePurchaseUseCase';
import { IMessagingGateway } from '@/adapters/gateways/IMessagingGateway';

@injectable()
export class PlacePurchase implements PlacePurchaseUseCase {
  constructor(
    @inject(TYPES.PurchaseRepository)
    private purchaseRepository: IPurchaseRepository,
    @inject(TYPES.Messaging)
    private messaging: IMessagingGateway
  ) {}

  async createPurchase(data: PlacePurchaseDTO): Promise<void> {
    const purchaseId = await this.purchaseRepository.create(data);

    await this.messaging.initialize();
    await this.messaging.publishInQueue(
      'purchase',
      JSON.stringify({ purchaseId })
    );
  }
}
