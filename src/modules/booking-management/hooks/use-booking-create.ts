'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { BookingCreate } from '@/lib/schemas/booking';

interface LeadOption {
  value: string;
  label: string;
}

export function useBookingCreate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [leadOptions, setLeadOptions] = useState<LeadOption[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/admin/leads?limit=100');
        if (response.ok) {
          const data = await response.json();
          const options = (data.data || []).map((l: { id: string; name: string }) => ({
            value: l.id,
            label: l.name,
          }));
          setLeadOptions(options);
        }
      } catch {
        toast.error('Failed to load leads');
      }
    };

    fetchLeads();
  }, []);

  const onSubmit = async (data: BookingCreate) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create booking');
      }

      toast.success('Booking created successfully');
      router.push('/admin/bookings');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create booking';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, leadOptions };
}
