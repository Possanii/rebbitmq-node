import { IPurchaseRepository } from '@/adapters/repositories/IPurchaseRepository';
import { PurchaseRegistryUseCase } from '@/domain/PurchaseRegistryUseCase';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogGateway } from '@/adapters/gateways/ILogGateaway';

@injectable()
export class PurchaseRegistry implements PurchaseRegistryUseCase {
  constructor(
    @inject(TYPES.PurchaseRepository)
    private purchaseRepository: IPurchaseRepository,
    @inject(TYPES.Log) private logGateway: ILogGateway
  ) {}

  async registerPurchase(purchaseId: string): Promise<void> {
    const purchase = await this.purchaseRepository.getById(purchaseId);

    this.logGateway.log({ message: 'Purchase found', purchase });
  }
}
