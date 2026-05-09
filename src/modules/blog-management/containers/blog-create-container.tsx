'use client';

import { useBlogCreateForm } from '../hooks/use-blog-create';
import { BlogCreateUI } from '../components/blog-create-ui/blog-create-ui';

export function BlogCreateContainer() {
  const { onSubmit, isPending } = useBlogCreateForm();

  return <BlogCreateUI onSubmit={onSubmit} isLoading={isPending} />;
}
