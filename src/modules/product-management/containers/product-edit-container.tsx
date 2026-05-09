'use client';

import { useProductEdit } from '../hooks/use-product-edit';
import { ProductEditUI } from '../components/product-edit-ui/product-edit-ui';

interface ProductEditContainerProps {
  id: string;
}

export function ProductEditContainer({ id }: ProductEditContainerProps) {
  const { onSubmit, isLoading, isFetching, defaultValues, categoryOptions } = useProductEdit(id);

  if (isFetching) {
    return <div className="text-muted-foreground">Loading product...</div>;
  }

  return (
    <ProductEditUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      categoryOptions={categoryOptions}
      defaultValues={defaultValues}
    />
  );
}
