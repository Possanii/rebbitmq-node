import { productSchema } from '@/application/models/Product';
import { productPurchaseSchema } from '@/application/models/ProductPurchase';
import { purchaseSchema } from '@/application/models/Purchase';
import { z } from 'zod';

export const placePurchasePurchaseSchema = purchaseSchema
  .pick({
    total: true,
  })
  .extend({
    products: z.array(
      productPurchaseSchema
        .pick({
          quantity: true,
        })
        .extend({
          product: productSchema.pick({
            id: true,
          }),
        })
    ),
  });

export type PlacePurchasePurchase = z.infer<typeof placePurchasePurchaseSchema>;

export const placePurchaseDTOSchema = z.object({
  purchase: placePurchasePurchaseSchema,
  buyerId: z.string().uuid(),
});

export type PlacePurchaseDTO = z.infer<typeof placePurchaseDTOSchema>;
