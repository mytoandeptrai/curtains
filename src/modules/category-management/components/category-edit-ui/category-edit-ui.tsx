'use client';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { FormInput } from '@/components/form-fields/form-input';
import { FormTextarea } from '@/components/form-fields/form-textarea';
import { categoryEditSchema } from '@/lib/schemas/category';
import type { CategoryEdit } from '@/lib/schemas/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface CategoryEditUIProps {
  onSubmit: (data: CategoryEdit) => Promise<void>;
  isLoading: boolean;
  defaultValues?: Partial<CategoryEdit>;
}

export function CategoryEditUI({ onSubmit, isLoading, defaultValues }: CategoryEditUIProps) {
  const form = useForm<CategoryEdit>({
    resolver: zodResolver(categoryEditSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      seo_title: '',
      seo_description: '',
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  return (
    <FormWrapper form={form} onSubmit={onSubmit} className="space-y-6">
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
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
    </FormWrapper>
  );
}
