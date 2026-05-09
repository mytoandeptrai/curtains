'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { BlogCreate } from '@/lib/schemas/blog';

export function useBlogCreate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: BlogCreate) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create blog post');
      }

      toast.success('Blog post created successfully');
      router.push('/admin/blog');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create blog post';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
}
