'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetProductDetail, useUpdateProductMutation } from '@/api/products';
import { useGetCategoryList } from '@/api/categories';
import { useQueryClient } from '@tanstack/react-query';
import type { ProductEdit } from '@/lib/schemas/product';

interface CategoryOption {
  value: string;
  label: string;
}

export function useProductEdit(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: productData, isLoading: isFetching } = useGetProductDetail({ id });
  const { data: categoriesData } = useGetCategoryList({ page: 1, pageSize: 100 });
  const updateMutation = useUpdateProductMutation();

  const defaultValues: Partial<ProductEdit> | undefined = productData?.data
    ? {
        name: productData.data.name,
        sku: (productData.data as any).sku || '',
        slug: productData.data.slug,
        description: productData.data.description,
        price: (productData.data as any).price || 0,
        salePrice: (productData.data as any).salePrice,
        stockQuantity: (productData.data as any).stockQuantity || 1,
        unit: (productData.data as any).unit || '',
        color: (productData.data as any).color || '',
        material: (productData.data as any).material || '',
        finish: (productData.data as any).finish || '',
        category_id: (productData.data as any).category,
        featured: productData.data.featured,
        variants: (productData.data as any).variants,
        imageUrl: (productData.data as any).imageUrl,
        images: (productData.data as any).images,
        metaTitle: (productData.data as any).metaTitle,
        metaDescription: (productData.data as any).metaDescription,
      }
    : undefined;

  const categoryOptions: CategoryOption[] = categoriesData?.data
    ? categoriesData.data.map((c: any) => ({
        value: c.id,
        label: c.name,
      }))
    : [];

  const onSubmit = async (data: ProductEdit) => {
    try {
      await updateMutation.mutateAsync({
        id,
        name: data.name,
        sku: data.sku,
        slug: data.slug,
        description: data.description,
        price: data.price,
        salePrice: data.salePrice,
        stockQuantity: data.stockQuantity,
        unit: data.unit,
        color: data.color,
        material: data.material,
        finish: data.finish,
        category: data.category_id,
        featured: data.featured,
        variants: data.variants,
        imageUrl: data.imageUrl,
        images: data.images,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      });

      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update product';
      toast.error(message);
    }
  };

  return { onSubmit, isLoading: updateMutation.isPending, isFetching, defaultValues, categoryOptions };
}
