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
        slug: productData.data.slug,
        description: productData.data.description,
        base_price: (productData.data as any).price,
        category_id: (productData.data as any).category,
        featured: productData.data.featured,
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
        slug: data.slug,
        description: data.description,
        price: data.base_price,
        category: data.category_id,
        featured: data.featured,
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
