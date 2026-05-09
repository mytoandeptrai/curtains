'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  seo_title: string;
  seo_description: string;
  created_at: string;
}

interface UseCategoryListReturn {
  data: Category[];
  total: number;
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (search: string) => void;
  offset: number;
  setOffset: (offset: number) => void;
  limit: number;
  refetch: () => void;
}

export function useCategoryList(): UseCategoryListReturn {
  const [data, setData] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
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

      const response = await fetch(`/api/admin/categories?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }, [search, offset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, isLoading, error, search, setSearch, offset, setOffset, limit, refetch: fetchData };
}
