import { ICurrentDatabase } from '@/adapters/database/ICurrentDatabase';
import { IPurchaseRepository } from '@/adapters/repositories/IPurchaseRepository';
import { TYPES } from '@/application/types';
import { Purchase } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
export class PurchaseRepository implements IPurchaseRepository {
  constructor(@inject(TYPES.Database) private database: ICurrentDatabase) {}

  async getById(id: string): Promise<Purchase> {
    const conn = await this.database.connect();

    const purchase = await conn.purchase.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return purchase;
  }
}
