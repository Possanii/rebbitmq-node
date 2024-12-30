import { inject, injectable } from 'inversify';
import { IUserRepository } from '../../adapters/repositories/IUserRepository';
import { ILogGateway } from '../../adapters/gateways/ILogGateaway';
import { User } from '../../application/models/User';
import { TYPES } from '../../application/types';
import { ICurrentORM } from '@/adapters/orm/ICurrentORM';

@injectable()
export class PostgresUserRepository implements IUserRepository {
  constructor(
    @inject(TYPES.Orm) private orm: ICurrentORM,
    @inject(TYPES.Log) private log: ILogGateway
  ) {}

  async create(user: Pick<User, 'name' | 'email'>): Promise<void> {
    const db = await this.orm.connect();

    await db.user.create({
      data: user,
    });

    this.log.log({ message: 'User created:', user });

    await this.orm.disconnect();
  }

  async get(id: string): Promise<User> {
    const db = await this.orm.connect();

    const user = await db.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    this.log.log({ message: 'User retrieved:', user });

    await this.orm.disconnect();

    return user;
  }

  async update(user: Pick<User, 'id' | 'name' | 'email'>): Promise<void> {
    const db = await this.orm.connect();

    await db.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });

    this.log.log({ message: 'User updated:', user });

    await this.orm.disconnect();
  }

  async delete(id: string): Promise<void> {
    const db = await this.orm.connect();

    await db.user.delete({
      where: {
        id,
      },
    });

    this.log.log({ message: 'User deleted:', id });

    await this.orm.disconnect();
  }
}
