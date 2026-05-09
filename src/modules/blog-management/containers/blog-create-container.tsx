'use client';

import { useBlogCreate } from '../hooks/use-blog-create';
import { BlogCreateUI } from '../components/blog-create-ui/blog-create-ui';

export function BlogCreateContainer() {
  const { onSubmit, isLoading } = useBlogCreate();

  return <BlogCreateUI onSubmit={onSubmit} isLoading={isLoading} />;
}
