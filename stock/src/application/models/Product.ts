import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  price: z.coerce.number().positive(),
});

export type Product = z.infer<typeof productSchema>;
