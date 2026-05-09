'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { CategoryEdit } from '@/lib/schemas/category';

export function useCategoryEdit(id: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [defaultValues, setDefaultValues] = useState<Partial<CategoryEdit> | undefined>();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/admin/categories/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }
        const data = await response.json();
        setDefaultValues(data);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to fetch category';
        toast.error(message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCategory();
  }, [id]);

  const onSubmit = async (data: CategoryEdit) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update category');
      }

      toast.success('Category updated successfully');
      router.push('/admin/categories');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update category';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, isFetching, defaultValues };
}
