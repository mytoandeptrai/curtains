'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateProductMutation } from '@/api/products';
import { useQueryClient } from '@tanstack/react-query';
import type { ProductCreate } from '@/lib/schemas/product';

export function useProductCreate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useCreateProductMutation();

  const onSubmit = async (data: ProductCreate) => {
    try {
      await createMutation.mutateAsync({
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.base_price,
        category: data.category_id,
        featured: data.featured,
      });

      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
      router.push('/admin/products');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create product';
      toast.error(message);
    }
  };

  return { onSubmit, isLoading: createMutation.isPending };
}
