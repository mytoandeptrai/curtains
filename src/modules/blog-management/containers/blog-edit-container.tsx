'use client';

import { useBlogEditForm } from '../hooks/use-blog-edit';
import { BlogEditUI } from '../components/blog-edit-ui/blog-edit-ui';

interface BlogEditContainerProps {
  id: string;
}

export function BlogEditContainer({ id }: BlogEditContainerProps) {
  const { onSubmit, isPending, isFetching, defaultValues } = useBlogEditForm(id);

  if (isFetching) {
    return <div className="text-muted-foreground">Loading blog post...</div>;
  }

  return (
    <BlogEditUI
      onSubmit={onSubmit}
      isLoading={isPending}
      defaultValues={defaultValues}
    />
  );
}
