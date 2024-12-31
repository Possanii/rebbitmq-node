import { CreateProductUseCase } from '@/domain/CreateUserUseCase';
import { Product } from '../models/Product';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ProductRepository } from '@/infra/repositories/ProductRepository';

@injectable()
export class CreateProduct implements CreateProductUseCase {
  constructor(
    @inject(TYPES.ProductRepository)
    private productRepository: ProductRepository
  ) {}

  async create(data: Pick<Product, 'name' | 'price'>): Promise<void> {
    await this.productRepository.create(data);
  }
}
