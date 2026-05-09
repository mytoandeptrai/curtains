import { z } from 'zod';

export const blogBaseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required').max(300),
  thumbnail_url: z.string().url().optional().or(z.literal('')),
  seo_title: z.string().max(100).optional().or(z.literal('')),
  seo_description: z.string().max(160).optional().or(z.literal('')),
  seo_keywords: z.string().max(200).optional().or(z.literal('')),
  published: z.boolean(),
});

export const blogCreateSchema = blogBaseSchema;
export const blogEditSchema = blogBaseSchema;

export type BlogCreate = z.infer<typeof blogCreateSchema>;
export type BlogEdit = z.infer<typeof blogEditSchema>;
