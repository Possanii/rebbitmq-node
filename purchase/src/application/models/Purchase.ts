import { z } from 'zod';

export const purchaseSchema = z.object({
  id: z.string().uuid(),
  total: z.number(),
});

export type Purchase = z.infer<typeof purchaseSchema>;
