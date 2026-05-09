import { z } from 'zod';

export const productExtraSchema = z.object({
  type: z.enum(['fixed', 'per-m2']),
  amount: z.number().min(0),
  name: z.string().min(1),
});

export const productVariantSchema = z.object({
  color: z.string().min(1, 'Color is required'),
  material: z.string().min(1, 'Material is required'),
  finish: z.string().min(1, 'Finish is required'),
  layers: z.array(z.string()).optional(),
});

export const productMediaSchema = z.object({
  url: z.string().optional(),
  file: z.instanceof(File).optional(),
});

export const productBaseSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters').max(100),
  sku: z.string().min(3, 'SKU must be at least 3 characters'),
  slug: z.string().min(1, 'Slug is required').max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category_id: z.string().uuid('Invalid category'),
  price: z.number().min(1, 'Price must be at least 1'),
  salePrice: z.number().min(0).optional(),
  stockQuantity: z.number().min(1, 'Stock quantity must be at least 1'),
  unit: z.string().min(1, 'Unit is required'),
  color: z.string().min(1, 'Color is required'),
  material: z.string().min(1, 'Material is required'),
  finish: z.string().min(1, 'Finish is required'),
  variants: z.array(productVariantSchema).optional(),
  imageUrl: z.array(productMediaSchema).optional(),
  images: z.array(productMediaSchema).optional(),
  metaTitle: z.string().min(10, 'Meta title must be at least 10 characters').optional().or(z.literal('')),
  metaDescription: z.string().min(20, 'Meta description must be at least 20 characters').optional().or(z.literal('')),
  featured: z.boolean(),
  extras: z.array(productExtraSchema).optional(),
});

export const productCreateSchema = productBaseSchema;
export const productEditSchema = productBaseSchema;

export type ProductCreate = z.infer<typeof productCreateSchema>;
export type ProductEdit = z.infer<typeof productEditSchema>;
export type ProductExtraInput = z.infer<typeof productExtraSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type ProductMedia = z.infer<typeof productMediaSchema>;
