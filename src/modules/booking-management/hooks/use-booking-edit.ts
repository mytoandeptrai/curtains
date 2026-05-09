'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetBookingDetail, useUpdateBookingMutation } from '@/api/bookings';
import { useQueryClient } from '@tanstack/react-query';
import type { BookingEdit } from '@/lib/schemas/booking';

export function useBookingEditForm(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: bookingData, isLoading: isFetching } = useGetBookingDetail({ id });
  const updateMutation = useUpdateBookingMutation();

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

  return { onSubmit, isLoading: updateMutation.isPending, isFetching, defaultValues };
}
