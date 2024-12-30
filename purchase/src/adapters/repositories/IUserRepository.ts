import { User } from '../../application/models/User';

export interface IUserRepository {
  create(user: Pick<User, 'name' | 'email'>): Promise<void>;
  get(id: string): Promise<User>;
  update(user: Pick<User, 'id' | 'name' | 'email'>): Promise<void>;
  delete(id: string): Promise<void>;
}
