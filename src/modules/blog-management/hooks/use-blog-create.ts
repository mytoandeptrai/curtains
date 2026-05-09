'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateBlogMutation } from '@/api/blog';
import { useQueryClient } from '@tanstack/react-query';
import type { BlogCreate } from '@/lib/schemas/blog';

export function useBlogCreateForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useCreateBlogMutation();

  const onSubmit = async (data: BlogCreate) => {
    try {
      await createMutation.mutateAsync({
        title: data.title,
        slug: data.slug,
        content: data.content,
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
        status: data.published ? 'published' : 'draft',
      });

      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog post created successfully');
      router.push('/admin/blog');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create blog post';
      toast.error(message);
    }
  };

  return { onSubmit, isPending: createMutation.isPending };
}
