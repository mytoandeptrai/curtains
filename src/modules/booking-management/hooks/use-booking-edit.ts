'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetBookingDetail, useUpdateBookingMutation } from '@/api/bookings';
import { useGetLeadList } from '@/api/leads';
import { useQueryClient } from '@tanstack/react-query';
import type { BookingEdit } from '@/lib/schemas/booking';

interface LeadOption {
  value: string;
  label: string;
}

export function useBookingEditForm(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: bookingData, isLoading: isFetching } = useGetBookingDetail({ id });
  const { data: leadsResponse } = useGetLeadList({ page: 1, pageSize: 100 });
  const updateMutation = useUpdateBookingMutation();

  const leadOptions: LeadOption[] = (leadsResponse?.data || []).map((l: { id: string; customer_name: string }) => ({
    value: l.id,
    label: l.customer_name,
  }));

  const defaultValues: Partial<BookingEdit> | undefined = bookingData?.data
    ? {
        lead_id: bookingData.data.lead_id,
        booking_date: bookingData.data.booking_date,
        booking_time: bookingData.data.booking_time,
        status: bookingData.data.status,
        notes: bookingData.data.notes,
      }
    : undefined;

  const onSubmit = async (data: BookingEdit) => {
    try {
      await updateMutation.mutateAsync({
        id,
        lead_id: data.lead_id,
        booking_date: data.booking_date,
        booking_time: data.booking_time,
        status: data.status,
        notes: data.notes,
      });

      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking updated successfully');
      router.push('/admin/bookings');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update booking';
      toast.error(message);
    }
  };

  return { onSubmit, isLoading: updateMutation.isPending, isFetching, defaultValues, leadOptions };
}
