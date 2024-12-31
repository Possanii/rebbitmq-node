import { ICurrentDatabase } from '@/adapters/database/ICurrentDatabase';
import { IProductRepository } from '@/adapters/repositories/IProductRepository';
import { createSlug } from '@/application/helpers/createSlug';
import { Product } from '@/application/models/Product';
import { TYPES } from '@/application/types';
import { inject, injectable } from 'inversify';

injectable();
export class ProductRepository implements IProductRepository {
  constructor(@inject(TYPES.Database) private database: ICurrentDatabase) {}

  async create(product: Pick<Product, 'name' | 'price'>): Promise<void> {
    const conn = await this.database.connect();

    await conn.product.create({
      data: {
        name: product.name,
        slug: createSlug(product.name),
        price: product.price,
      },
    });

    await this.database.disconnect();
  }

  async getAll(): Promise<Product[]> {
    const conn = await this.database.connect();

    const products = await conn.product.findMany();

    await this.database.disconnect();

    return products;
  }

  async getById(id: string): Promise<Product> {
    const conn = await this.database.connect();

    const product = await conn.product.findUniqueOrThrow({
      where: {
        id,
      },
    });

    await this.database.disconnect();

    return product;
  }

  async update(product: Product): Promise<void> {
    const conn = await this.database.connect();

    await conn.product.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        price: product.price,
      },
    });

    await this.database.disconnect();
  }

  async delete(id: string): Promise<void> {
    const conn = await this.database.connect();

    await conn.product.delete({
      where: {
        id,
      },
    });

    await this.database.disconnect();
  }
}
