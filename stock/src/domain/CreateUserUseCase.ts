import { Product } from '@/application/models/Product';

export interface CreateProductUseCase {
  create(data: Pick<Product, 'name' | 'price'>): Promise<void>;
}
