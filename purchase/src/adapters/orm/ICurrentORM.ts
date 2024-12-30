import { PrismaClient } from '@prisma/client';
import { IORM } from './IORM';

export type ICurrentORM = IORM<PrismaClient>;
