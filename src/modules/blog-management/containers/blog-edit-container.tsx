'use client';

import { useBlogEdit } from '../hooks/use-blog-edit';
import { BlogEditUI } from '../components/blog-edit-ui/blog-edit-ui';

interface BlogEditContainerProps {
  id: string;
}

export function BlogEditContainer({ id }: BlogEditContainerProps) {
  const { onSubmit, isLoading, isFetching, defaultValues } = useBlogEdit(id);

  if (isFetching) {
    return <div className="text-muted-foreground">Loading blog post...</div>;
  }

  return (
    <BlogEditUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      defaultValues={defaultValues}
    />
  );
}
