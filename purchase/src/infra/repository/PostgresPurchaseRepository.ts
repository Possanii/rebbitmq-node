import { inject, injectable } from 'inversify';
import { IPurchaseRepository } from '../../adapters/repositories/IPurchaseRepository';
import { ILogGateway } from '../../adapters/gateways/ILogGateaway';
import { TYPES } from '../../application/types';
import { ICurrentORM } from '@/adapters/orm/ICurrentORM';
import { PlacePurchaseDTO } from '@/domain/dto/placePurchaseDTO';

@injectable()
export class PostgresPurchaseRepository implements IPurchaseRepository {
  constructor(
    @inject(TYPES.Orm) private orm: ICurrentORM,
    @inject(TYPES.Log) private logGateway: ILogGateway
  ) {}

  async create({ purchase, buyerId }: PlacePurchaseDTO): Promise<string> {
    const conn = await this.orm.connect();

    const purchaseData = await conn.purchase.create({
      data: {
        total: purchase.total,
        buyer: {
          connect: {
            id: buyerId,
          },
        },
        products: {
          create: purchase.products.map((product) => ({
            quantity: product.quantity,
            product: {
              connect: {
                id: product.product.id,
              },
            },
          })),
        },
      },
    });

    this.logGateway.log({ message: 'Purchase created', purchase });

    return purchaseData.id;
  }
}
