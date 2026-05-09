'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateCategoryMutation } from '@/api/categories';
import { useQueryClient } from '@tanstack/react-query';
import type { CategoryCreate } from '@/lib/schemas/category';

export function useCategoryCreate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useCreateCategoryMutation();

  const onSubmit = async (data: CategoryCreate) => {
    try {
      await createMutation.mutateAsync({
        name: data.name,
        slug: data.slug,
        description: data.description,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
      });

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully');
      router.push('/admin/categories');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create category';
      toast.error(message);
    }
  };

  return { onSubmit, isLoading: createMutation.isPending };
}
