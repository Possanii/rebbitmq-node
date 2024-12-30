import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  MESSAGING_URL: z.string().url(),
  API_BASE_PORT: z.coerce.number().positive().default(3000),
});

export const env = envSchema.parse(process.env);
