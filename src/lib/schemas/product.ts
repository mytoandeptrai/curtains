import { z } from 'zod';

export const productExtraSchema = z.object({
  type: z.enum(['fixed', 'per-m2']),
  amount: z.number().min(0),
  name: z.string().min(1),
});

export const productBaseSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100),
  description: z.string().min(1, 'Description is required'),
  category_id: z.string().uuid('Invalid category'),
  base_price: z.number().min(0, 'Base price must be 0 or greater'),
  featured: z.boolean().default(false),
  extras: z.array(productExtraSchema).optional(),
});

export const productCreateSchema = productBaseSchema;
export const productEditSchema = productBaseSchema;

export type ProductCreate = z.infer<typeof productCreateSchema>;
export type ProductEdit = z.infer<typeof productEditSchema>;
export type ProductExtraInput = z.infer<typeof productExtraSchema>;
