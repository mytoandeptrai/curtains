'use client';

import { useCategoryEdit } from '../hooks/use-category-edit';
import { CategoryEditUI } from '../components/category-edit-ui/category-edit-ui';

interface CategoryEditContainerProps {
  id: string;
}

export function CategoryEditContainer({ id }: CategoryEditContainerProps) {
  const { onSubmit, isLoading, isFetching, defaultValues } = useCategoryEdit(id);

  if (isFetching) {
    return <div className="text-muted-foreground">Loading category...</div>;
  }

  return (
    <CategoryEditUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      defaultValues={defaultValues}
    />
  );
}
