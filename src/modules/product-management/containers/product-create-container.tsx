'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useProductCreate } from '../hooks/use-product-create';
import { ProductCreateUI } from '../components/product-create-ui/product-create-ui';

interface CategoryOption {
  value: string;
  label: string;
}

export function ProductCreateContainer() {
  const { onSubmit, isLoading } = useProductCreate();
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories?limit=100');
        if (response.ok) {
          const data = await response.json();
          const options = (data.data || []).map((c: { id: string; name: string }) => ({
            value: c.id,
            label: c.name,
          }));
          setCategoryOptions(options);
        }
      } catch {
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  return (
    <ProductCreateUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      categoryOptions={categoryOptions}
    />
  );
}
