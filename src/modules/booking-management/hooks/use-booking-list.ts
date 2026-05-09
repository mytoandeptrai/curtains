'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface Booking {
  id: string;
  lead_id: string;
  leads?: { id: string; name: string; phone: string } | null;
  booking_date: string;
  booking_time: string | null;
  status: 'pending' | 'confirmed' | 'done';
  notes: string | null;
  created_at: string;
}

interface UseBookingListReturn {
  data: Booking[];
  total: number;
  isLoading: boolean;
  error: string | null;
  status: string;
  setStatus: (status: string) => void;
  offset: number;
  setOffset: (offset: number) => void;
  limit: number;
  refetch: () => void;
}

export function useBookingList(): UseBookingListReturn {
  const [data, setData] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
      });
      if (status) params.set('status', status);

      const response = await fetch(`/api/admin/bookings?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  }, [status, offset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    total,
    isLoading,
    error,
    status,
    setStatus,
    offset,
    setOffset,
    limit,
    refetch: fetchData,
  };
}
