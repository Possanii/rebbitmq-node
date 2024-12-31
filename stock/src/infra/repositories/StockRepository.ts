import { ICurrentDatabase } from '@/adapters/database/ICurrentDatabase';
import { IStockRepository } from '@/adapters/repositories/IStockRepository';
import { Stock } from '@/application/models/Stock';
import { TYPES } from '@/application/types';
import { inject, injectable } from 'inversify';

@injectable()
export class StockRepository implements IStockRepository {
  constructor(@inject(TYPES.Database) private database: ICurrentDatabase) {}

  async create(stock: Pick<Stock, 'name' | 'slug'>): Promise<void> {
    const conn = await this.database.connect();

    await conn.stock.create({
      data: {
        name: stock.name,
        slug: stock.slug,
      },
    });

    await this.database.disconnect();
  }

  async getAll(): Promise<Stock[]> {
    const conn = await this.database.connect();

    const stocks = await conn.stock.findMany();

    await this.database.disconnect();

    return stocks;
  }

  async getById(id: string): Promise<Stock> {
    const conn = await this.database.connect();

    const stock = await conn.stock.findUniqueOrThrow({
      where: {
        id,
      },
    });

    await this.database.disconnect();

    return stock;
  }

  async update(stock: Stock): Promise<void> {
    const conn = await this.database.connect();

    await conn.stock.update({
      where: {
        id: stock.id,
      },
      data: {
        name: stock.name,
        slug: stock.slug,
      },
    });

    await this.database.disconnect();
  }

  async delete(id: string): Promise<void> {
    const conn = await this.database.connect();

    await conn.stock.delete({
      where: {
        id,
      },
    });

    await this.database.disconnect();
  }
}
