'use client';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { FormInput } from '@/components/form-fields/form-input';
import { FormTextarea } from '@/components/form-fields/form-textarea';
import { categoryCreateSchema } from '@/lib/schemas/category';
import type { CategoryCreate } from '@/lib/schemas/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface CategoryCreateFormProps {
  onSubmit: (data: CategoryCreate) => Promise<void>;
  isLoading: boolean;
}

export function CategoryCreateForm({ onSubmit, isLoading }: CategoryCreateFormProps) {
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
    <FormWrapper form={form} onSubmit={onSubmit} className="space-y-8">
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
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
            description="Lowercase letters, numbers, and hyphens only"
          />
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Description</h3>
        <FormTextarea
          control={form.control}
          name="description"
          label="Category Description"
          placeholder="Describe what this category contains..."
        />
      </div>

      {/* SEO Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">SEO Settings</h3>
        <div className="grid gap-4">
          <FormInput
            control={form.control}
            name="seo_title"
            label="SEO Title"
            placeholder="For search engines (30-60 characters)"
            description="Optimal length: 30-60 characters"
          />

          <FormTextarea
            control={form.control}
            name="seo_description"
            label="SEO Description"
            placeholder="For search engines (50-160 characters)"
            description="Optimal length: 50-160 characters"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Category'}
        </Button>
      </div>
    </FormWrapper>
  );
}
