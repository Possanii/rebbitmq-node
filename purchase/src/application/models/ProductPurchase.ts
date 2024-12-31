import { z } from 'zod';

export const productPurchaseSchema = z.object({
  id: z.string().uuid(),
  quantity: z.coerce.number().positive(),
});

export type ProductPurchase = z.infer<typeof productPurchaseSchema>;
