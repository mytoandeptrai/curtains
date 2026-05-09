'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetCategoryDetail, useUpdateCategoryMutation } from '@/api/categories';
import { useQueryClient } from '@tanstack/react-query';
import type { CategoryEdit } from '@/lib/schemas/category';

export function useCategoryEdit(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: categoryData, isLoading: isFetching } = useGetCategoryDetail({ id });
  const updateMutation = useUpdateCategoryMutation();

  const defaultValues: Partial<CategoryEdit> | undefined = categoryData?.data
    ? {
        name: categoryData.data.name,
        slug: categoryData.data.slug,
        description: categoryData.data.description,
        seo_title: categoryData.data.seo_title,
        seo_description: categoryData.data.seo_description,
      }
    : undefined;

  const onSubmit = async (data: CategoryEdit) => {
    try {
      await updateMutation.mutateAsync({
        id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
      });

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated successfully');
      router.push('/admin/categories');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update category';
      toast.error(message);
    }
  };

  return { onSubmit, isLoading: updateMutation.isPending, isFetching, defaultValues };
}
