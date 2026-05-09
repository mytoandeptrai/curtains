'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  created_at: string;
}

interface UseBlogListReturn {
  data: BlogPost[];
  total: number;
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (search: string) => void;
  published: string;
  setPublished: (val: string) => void;
  offset: number;
  setOffset: (offset: number) => void;
  limit: number;
  refetch: () => void;
}

export function useBlogList(): UseBlogListReturn {
  const [data, setData] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [published, setPublished] = useState('');
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
      if (published) params.set('published', published);

      const response = await fetch(`/api/admin/blog?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  }, [search, published, offset]);

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
    published,
    setPublished,
    offset,
    setOffset,
    limit,
    refetch: fetchData,
  };
}
