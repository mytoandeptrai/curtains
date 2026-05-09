'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  categories?: { id: string; name: string } | null;
  base_price: number;
  featured: boolean;
  created_at: string;
}

interface UseProductListReturn {
  data: Product[];
  total: number;
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (search: string) => void;
  categoryId: string;
  setCategoryId: (id: string) => void;
  featured: string;
  setFeatured: (val: string) => void;
  offset: number;
  setOffset: (offset: number) => void;
  limit: number;
  refetch: () => void;
}

export function useProductList(): UseProductListReturn {
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featured, setFeatured] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
        search,
      });
      if (categoryId) params.set('category_id', categoryId);
      if (featured) params.set('featured', featured);

      const response = await fetch(`/api/admin/products?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, [search, categoryId, featured, offset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    total,
    isLoading,
    error,
    search,
    setSearch,
    categoryId,
    setCategoryId,
    featured,
    setFeatured,
    offset,
    setOffset,
    limit,
    refetch: fetchData,
  };
}
