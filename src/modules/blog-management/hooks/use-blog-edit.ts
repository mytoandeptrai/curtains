'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { BlogEdit } from '@/lib/schemas/blog';

export function useBlogEdit(id: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [defaultValues, setDefaultValues] = useState<Partial<BlogEdit> | undefined>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/blog/${id}`);
        if (!response.ok) throw new Error('Failed to fetch blog post');

        const data = await response.json();
        setDefaultValues(data);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to fetch blog post';
        toast.error(message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchPost();
  }, [id]);

  const onSubmit = async (data: BlogEdit) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update blog post');
      }

      toast.success('Blog post updated successfully');
      router.push('/admin/blog');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update blog post';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, isFetching, defaultValues };
}
