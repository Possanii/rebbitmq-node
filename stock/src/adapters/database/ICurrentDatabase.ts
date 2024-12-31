import { PrismaClient } from '@prisma/client';
import { IDatabase } from './IDatabase';

export type ICurrentDatabase = IDatabase<PrismaClient>;
