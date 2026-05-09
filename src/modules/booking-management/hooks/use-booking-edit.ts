'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { BookingEdit } from '@/lib/schemas/booking';

interface LeadOption {
  value: string;
  label: string;
}

export function useBookingEdit(id: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [defaultValues, setDefaultValues] = useState<Partial<BookingEdit> | undefined>();
  const [leadOptions, setLeadOptions] = useState<LeadOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingRes, leadsRes] = await Promise.all([
          fetch(`/api/admin/bookings/${id}`),
          fetch('/api/admin/leads?limit=100'),
        ]);

        if (!bookingRes.ok) throw new Error('Failed to fetch booking');

        const booking = await bookingRes.json();
        setDefaultValues(booking);

        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          const options = (leadsData.data || []).map((l: { id: string; name: string }) => ({
            value: l.id,
            label: l.name,
          }));
          setLeadOptions(options);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to fetch booking';
        toast.error(message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [id]);

  const onSubmit = async (data: BookingEdit) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update booking');
      }

      toast.success('Booking updated successfully');
      router.push('/admin/bookings');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update booking';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, isFetching, defaultValues, leadOptions };
}
