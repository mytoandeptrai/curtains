'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { ProductEdit } from '@/lib/schemas/product';

interface CategoryOption {
  value: string;
  label: string;
}

export function useProductEdit(id: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [defaultValues, setDefaultValues] = useState<Partial<ProductEdit> | undefined>();
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          fetch(`/api/admin/products/${id}`),
          fetch('/api/admin/categories?limit=100'),
        ]);

        if (!productRes.ok) throw new Error('Failed to fetch product');

        const product = await productRes.json();
        setDefaultValues(product);

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          const options = (categoriesData.data || []).map((c: { id: string; name: string }) => ({
            value: c.id,
            label: c.name,
          }));
          setCategoryOptions(options);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to fetch product';
        toast.error(message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [id]);

  const onSubmit = async (data: ProductEdit) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update product');
      }

      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update product';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, isFetching, defaultValues, categoryOptions };
}
