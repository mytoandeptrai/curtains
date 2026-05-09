'use client';

import { useProductCreate } from '../hooks/use-product-create';
import { useGetCategoryList } from '@/api/categories';
import { ProductCreateUI } from '../components/product-create-ui/product-create-ui';

interface CategoryOption {
  value: string;
  label: string;
}

export function ProductCreateContainer() {
  const { onSubmit, isLoading } = useProductCreate();
  const { data: categoriesResponse } = useGetCategoryList({ page: 1, pageSize: 100 });

  const categoryOptions: CategoryOption[] = (categoriesResponse?.data || []).map((c: { id: string; name: string }) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <ProductCreateUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      categoryOptions={categoryOptions}
    />
  );
}
