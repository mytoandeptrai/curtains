'use client';

import { useProductCreate } from '../hooks/use-product-create';
import { ProductCreateUI } from '../components/product-create-ui/product-create-ui';

export function ProductCreateContainer() {
  const { onSubmit, isLoading, categoryOptions } = useProductCreate();

  return (
    <ProductCreateUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      categoryOptions={categoryOptions}
    />
  );
}
