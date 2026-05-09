'use client';

import { useCategoryCreate } from '../hooks/use-category-create';
import { CategoryCreateUI } from '../components/category-create-ui/category-create-ui';

export function CategoryCreateContainer() {
  const { onSubmit, isLoading } = useCategoryCreate();

  return <CategoryCreateUI onSubmit={onSubmit} isLoading={isLoading} />;
}
