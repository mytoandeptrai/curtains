'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/form-fields/form-input';
import { FormTextarea } from '@/components/form-fields/form-textarea';
import { categoryCreateSchema } from '@/lib/schemas/category';
import type { CategoryCreate } from '@/lib/schemas/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface CategoryCreateUIProps {
  onSubmit: (data: CategoryCreate) => Promise<void>;
  isLoading: boolean;
}

export function CategoryCreateUI({ onSubmit, isLoading }: CategoryCreateUIProps) {
  const form = useForm<CategoryCreate>({
    resolver: zodResolver(categoryCreateSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      seo_title: '',
      seo_description: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          control={form.control}
          name="name"
          label="Category Name"
          placeholder="e.g., Roller Blinds"
          required
        />

        <FormInput
          control={form.control}
          name="slug"
          label="Slug"
          placeholder="e.g., roller-blinds"
          required
        />

        <FormTextarea
          control={form.control}
          name="description"
          label="Description"
          placeholder="Category description"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            control={form.control}
            name="seo_title"
            label="SEO Title"
            placeholder="For search engines"
          />

          <FormInput
            control={form.control}
            name="seo_description"
            label="SEO Description"
            placeholder="For search engines"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Category'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
