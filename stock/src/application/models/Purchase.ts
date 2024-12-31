import { z } from 'zod';

export const purchaseSchema = z.object({
  id: z.string().uuid(),
  total: z.coerce.number(),
});
