import { Stock } from '@/application/models/Stock';

export interface IStockRepository {
  getAll(): Promise<Stock[]>;
  getById(id: string): Promise<Stock>;
  create(stock: Pick<Stock, 'name' | 'slug'>): Promise<void>;
  update(stock: Stock): Promise<void>;
  delete(id: string): Promise<void>;
}
