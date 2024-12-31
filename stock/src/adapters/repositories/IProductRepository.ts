import { Product } from '@/application/models/Product';

export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  create(product: Pick<Product, 'name' | 'price'>): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
