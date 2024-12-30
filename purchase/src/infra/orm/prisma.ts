import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { IORM } from '../../adapters/orm/IORM';

@injectable()
export class Prisma implements IORM<PrismaClient> {
  private static client: PrismaClient;

  public constructor() {}

  static getInstance(): PrismaClient {
    if (!this.client) {
      this.client = new PrismaClient({
        log: [
          {
            emit: 'event',
            level: 'query',
          },
        ],
      });
    }

    return this.client;
  }

  async connect<PrismaClient>(): Promise<PrismaClient> {
    await Prisma.getInstance().$connect();
    return Prisma.getInstance() as PrismaClient;
  }

  async disconnect(): Promise<void> {
    await Prisma.getInstance().$disconnect();
  }
}
