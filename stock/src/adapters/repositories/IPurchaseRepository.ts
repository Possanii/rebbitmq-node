import { Purchase } from '@prisma/client';

export interface IPurchaseRepository {
  getById(id: string): Promise<Purchase>;
}
