import { z } from 'zod';

export const categoryBaseSchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100),
  description: z.string().max(500).optional().or(z.literal('')),
  seo_title: z.string().max(100).optional().or(z.literal('')),
  seo_description: z.string().max(160).optional().or(z.literal('')),
});

export const categoryCreateSchema = categoryBaseSchema;
export const categoryEditSchema = categoryBaseSchema;

export type CategoryCreate = z.infer<typeof categoryCreateSchema>;
export type CategoryEdit = z.infer<typeof categoryEditSchema>;
