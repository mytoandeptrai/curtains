'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetBlogDetail, useUpdateBlogMutation } from '@/api/blog';
import { useQueryClient } from '@tanstack/react-query';
import type { BlogEdit } from '@/lib/schemas/blog';
import { useMemo } from 'react';

export function useBlogEditForm(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading: isFetching } = useGetBlogDetail({ id });
  const updateMutation = useUpdateBlogMutation();

  const onSubmit = async (formData: BlogEdit) => {
    try {
      await updateMutation.mutateAsync({
        id,
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        seo_title: formData.seo_title || '',
        seo_description: formData.seo_description || '',
        status: formData.published ? 'published' : 'draft',
      });

      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog-detail', { id }] });
      toast.success('Blog post updated successfully');
      router.push('/admin/blog');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update blog post';
      toast.error(message);
    }
  };

  const defaultValues = useMemo(() => {
    if (!data?.data) return undefined;
    return {
      title: data.data.title,
      slug: data.data.slug,
      content: data.data.content,
      excerpt: '',
      seo_title: data.data.seo_title,
      seo_description: data.data.seo_description,
      seo_keywords: '',
      published: data.data.status === 'published',
    };
  }, [data?.data]);

  return {
    onSubmit,
    isPending: updateMutation.isPending,
    isFetching,
    defaultValues,
  };
}
