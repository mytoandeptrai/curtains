'use client';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { FormInput } from '@/components/form-fields/form-input';
import { FormTextarea } from '@/components/form-fields/form-textarea';
import { FormSelect } from '@/components/form-fields/form-select';
import { FormCheckbox } from '@/components/form-fields/form-checkbox';
import { FormMinimalTiptap } from '@/components/form-fields/form-minimal-tiptap';
import { FormInputFileDropzoneUpload } from '@/components/form-fields/form-input-file-dropzone';
import { productCreateSchema } from '@/lib/schemas/product';
import type { ProductCreate, ProductVariant } from '@/lib/schemas/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { useState } from 'react';

interface CategoryOption {
  value: string;
  label: string;
}

interface ProductCreateFormProps {
  onSubmit: (data: ProductCreate) => Promise<void>;
  isLoading: boolean;
  categoryOptions: CategoryOption[];
}

export function ProductCreateForm({ onSubmit, isLoading, categoryOptions }: ProductCreateFormProps) {
  const form = useForm<ProductCreate>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      name: '',
      sku: '',
      slug: '',
      description: '',
      category_id: '',
      price: 0,
      salePrice: undefined,
      stockQuantity: 1,
      unit: '',
      color: '',
      material: '',
      finish: '',
      variants: [],
      imageUrl: [],
      images: [],
      metaTitle: '',
      metaDescription: '',
      featured: false,
      extras: [],
    },
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  const addVariant = () => {
    appendVariant({
      color: '',
      material: '',
      finish: '',
      layers: [],
    } as ProductVariant);
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit} className="space-y-8">
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <FormInput
            control={form.control}
            name="name"
            label="Product Name"
            placeholder="e.g., Classic Roller Blind"
            required
          />

          <FormInput
            control={form.control}
            name="sku"
            label="SKU"
            placeholder="e.g., RB-001"
            required
          />

          <FormInput
            control={form.control}
            name="slug"
            label="Slug"
            placeholder="e.g., classic-roller-blind"
            required
            description="Lowercase, numbers, hyphens only"
          />
        </div>
      </div>

      {/* Pricing & Inventory Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pricing & Inventory</h3>
        <div className="grid gap-4 md:grid-cols-4">
          <FormInput
            control={form.control}
            name="price"
            label="Price"
            type="number"
            placeholder="0"
            min={1}
            required
          />

          <FormInput
            control={form.control}
            name="salePrice"
            label="Sale Price"
            type="number"
            placeholder="Optional"
            min={0}
          />

          <FormInput
            control={form.control}
            name="stockQuantity"
            label="Stock Quantity"
            type="number"
            placeholder="1"
            min={1}
            required
          />

          <FormInput
            control={form.control}
            name="unit"
            label="Unit"
            placeholder="e.g., pcs, kg, m"
            required
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Product Details</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <FormSelect
            control={form.control}
            name="category_id"
            label="Category"
            options={categoryOptions}
            placeholder="Select a category"
            required
          />

          <FormCheckbox
            control={form.control}
            name="featured"
            label="Featured"
            checkboxLabel="Mark as featured product"
          />
        </div>

        <FormMinimalTiptap
          control={form.control}
          name="description"
          label="Description"
          placeholder="Describe the product in detail..."
          required
          initialContent=""
        />
      </div>

      {/* Product Attributes Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Product Attributes</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <FormInput
            control={form.control}
            name="color"
            label="Color"
            placeholder="e.g., red, blue"
            required
          />

          <FormInput
            control={form.control}
            name="material"
            label="Material"
            placeholder="e.g., cotton, polyester"
            required
          />

          <FormInput
            control={form.control}
            name="finish"
            label="Finish"
            placeholder="e.g., matte, glossy"
            required
          />
        </div>
      </div>

      {/* Variants Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Product Variants</h3>
        {variantFields.length > 0 && (
          <div className="space-y-4 bg-gray-50 p-4 rounded">
            {variantFields.map((field, index) => (
              <div key={field.id} className="space-y-4 pb-4 border-b last:border-b-0">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Variant {index + 1}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeVariant(index)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <FormInput
                    control={form.control}
                    name={`variants.${index}.color`}
                    label="Color"
                    placeholder="e.g., red"
                    required
                  />

                  <FormInput
                    control={form.control}
                    name={`variants.${index}.material`}
                    label="Material"
                    placeholder="e.g., cotton"
                    required
                  />

                  <FormInput
                    control={form.control}
                    name={`variants.${index}.finish`}
                    label="Finish"
                    placeholder="e.g., matte"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={addVariant}
        >
          Add Variant
        </Button>
      </div>

      {/* Images Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Product Images</h3>
        <FormInputFileDropzoneUpload
          control={form.control}
          name="imageUrl"
          label="Primary Image"
          description="Upload the main product image"
          config={{
            maxFiles: 1,
            maxSize: 5 * 1024 * 1024,
            acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
          }}
        />

        <FormInputFileDropzoneUpload
          control={form.control}
          name="images"
          label="Additional Images"
          description="Upload up to 4 additional product images"
          config={{
            maxFiles: 4,
            maxSize: 5 * 1024 * 1024,
            acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
          }}
        />
      </div>

      {/* SEO Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">SEO Settings</h3>
        <div className="grid gap-4">
          <FormInput
            control={form.control}
            name="metaTitle"
            label="Meta Title"
            placeholder="For search engines (30-60 characters)"
            description="Optimal length: 30-60 characters"
          />

          <FormTextarea
            control={form.control}
            name="metaDescription"
            label="Meta Description"
            placeholder="For search engines (50-160 characters)"
            description="Optimal length: 50-160 characters"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Product'}
        </Button>
      </div>
    </FormWrapper>
  );
}
