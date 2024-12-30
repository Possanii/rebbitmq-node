import { inject } from 'inversify';
import { TYPES } from '../types';
import { IUserRepository } from '../../adapters/repositories/IUserRepository';
import { User } from '../models/User';

export class UserUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async create(data: Pick<User, 'name' | 'email'>): Promise<any> {
    await this.userRepository.create(data);
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.get(id);
  }

  async findOneAndUpdate(
    user: Pick<User, 'id' | 'name' | 'email'>
  ): Promise<void> {
    return await this.userRepository.update(user);
  }

  async findOneAndDelete(id: string): Promise<void> {
    return await this.userRepository.delete(id);
  }
}
