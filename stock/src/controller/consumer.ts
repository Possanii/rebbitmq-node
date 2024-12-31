import { ILogGateway } from '@/adapters/gateways/ILogGateaway';
import { IMessagingGateway } from '@/adapters/gateways/IMessagingGateway';
import { TYPES } from '@/application/types';
import { PurchaseRegistryUseCase } from '@/domain/PurchaseRegistryUseCase';
import { inject } from 'inversify';

export class Consumer {
  constructor(
    @inject(TYPES.Log) private logGateway: ILogGateway,
    @inject(TYPES.Messaging) private messagingGateway: IMessagingGateway,
    @inject(TYPES.PurchaseRegistry)
    private purchaseRegistry: PurchaseRegistryUseCase
  ) {
    this.initialize();
  }

  async initialize(): Promise<void> {
    await this.messagingGateway.initialize();

    await this.messagingGateway.consume('purchase', (message) => {
      this.logGateway.log({
        message: 'Message consumed' + JSON.stringify(message),
      });

      if (message.fields.routingKey === 'purchase') {
        const purchaseId = JSON.parse(message.content.toString()) as {
          purchaseId: string;
        };

        this.purchaseRegistry.registerPurchase(purchaseId.purchaseId);
      }
    });
  }
}
