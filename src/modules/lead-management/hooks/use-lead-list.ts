'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  product_id: string | null;
  products?: { id: string; name: string } | null;
  status: 'new' | 'contacted' | 'closed';
  notes: string | null;
  created_at: string;
}

interface UseLeadListReturn {
  data: Lead[];
  total: number;
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (search: string) => void;
  status: string;
  setStatus: (status: string) => void;
  offset: number;
  setOffset: (offset: number) => void;
  limit: number;
  refetch: () => void;
}

export function useLeadList(): UseLeadListReturn {
  const [data, setData] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
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
      if (status) params.set('status', status);

      const response = await fetch(`/api/admin/leads?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  }, [search, status, offset]);

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
    status,
    setStatus,
    offset,
    setOffset,
    limit,
    refetch: fetchData,
  };
}
