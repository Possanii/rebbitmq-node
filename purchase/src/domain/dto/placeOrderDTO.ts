import { z } from 'zod';

export const placeOrderDTOSchema = z.object({
  email: z.string().email(),
  amount: z.number().positive(),
});

export type PlaceOrderDTO = z.infer<typeof placeOrderDTOSchema>;
