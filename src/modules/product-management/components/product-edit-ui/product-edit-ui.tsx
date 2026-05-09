'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/form-fields/form-input';
import { FormTextarea } from '@/components/form-fields/form-textarea';
import { FormSelect } from '@/components/form-fields/form-select';
import { FormCheckbox } from '@/components/form-fields/form-checkbox';
import { productEditSchema } from '@/lib/schemas/product';
import type { ProductEdit } from '@/lib/schemas/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface CategoryOption {
  value: string;
  label: string;
}

interface ProductEditUIProps {
  onSubmit: (data: ProductEdit) => Promise<void>;
  isLoading: boolean;
  categoryOptions: CategoryOption[];
  defaultValues?: Partial<ProductEdit>;
}

export function ProductEditUI({ onSubmit, isLoading, categoryOptions, defaultValues }: ProductEditUIProps) {
  const form = useForm<ProductEdit>({
    resolver: zodResolver(productEditSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      category_id: '',
      base_price: 0,
      featured: false,
      extras: [],
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({ ...form.getValues(), ...defaultValues });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            control={form.control}
            name="name"
            label="Product Name"
            placeholder="e.g., Classic Roller Blind"
            required
          />

          <FormInput
            control={form.control}
            name="slug"
            label="Slug"
            placeholder="e.g., classic-roller-blind"
            required
          />
        </div>

        <FormTextarea
          control={form.control}
          name="description"
          label="Description"
          placeholder="Describe the product..."
          required
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormSelect
            control={form.control}
            name="category_id"
            label="Category"
            options={categoryOptions}
            placeholder="Select a category"
            required
          />

          <FormInput
            control={form.control}
            name="base_price"
            label="Base Price (VND/m²)"
            type="number"
            placeholder="0"
            min={0}
            required
          />
        </div>

        <FormCheckbox
          control={form.control}
          name="featured"
          label="Featured"
          checkboxLabel="Mark as featured product"
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
