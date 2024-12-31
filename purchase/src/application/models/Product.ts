import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.coerce.number(),
});

export type Products = z.infer<typeof productSchema>;
