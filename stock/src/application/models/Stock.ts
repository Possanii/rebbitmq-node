import { z } from 'zod';

export const stockSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
});

export type Stock = z.infer<typeof stockSchema>;
