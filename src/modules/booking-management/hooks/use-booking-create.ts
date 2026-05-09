'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateBookingMutation } from '@/api/bookings';
import { useGetLeadList } from '@/api/leads';
import { useQueryClient } from '@tanstack/react-query';
import type { BookingCreate } from '@/lib/schemas/booking';

interface LeadOption {
  value: string;
  label: string;
}

export function useBookingCreateForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useCreateBookingMutation();
  const { data: leadsResponse } = useGetLeadList({ page: 1, pageSize: 100 });

  const leadOptions: LeadOption[] = (leadsResponse?.data || []).map((l: { id: string; customer_name: string }) => ({
    value: l.id,
    label: l.customer_name,
  }));

  const onSubmit = async (data: BookingCreate) => {
    try {
      await createMutation.mutateAsync({
        lead_id: data.lead_id,
        booking_date: data.booking_date,
        booking_time: data.booking_time,
        status: data.status,
        notes: data.notes,
      });

      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking created successfully');
      router.push('/admin/bookings');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create booking';
      toast.error(message);
    }
  };

  return { onSubmit, isPending: createMutation.isPending, leadOptions };
}
