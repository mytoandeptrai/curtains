'use client';

import { useBookingCreateForm } from '../hooks/use-booking-create';
import { useGetLeadList } from '@/api/leads';
import { BookingCreateUI } from '../components/booking-create-ui/booking-create-ui';

interface LeadOption {
  value: string;
  label: string;
}

export function BookingCreateContainer() {
  const { onSubmit, isPending } = useBookingCreateForm();
  const { data: leadsResponse } = useGetLeadList({ page: 1, pageSize: 100 });

  const leadOptions: LeadOption[] = (leadsResponse?.data || []).map((l: { id: string; customer_name: string }) => ({
    value: l.id,
    label: l.customer_name,
  }));

  return (
    <BookingCreateUI
      onSubmit={onSubmit}
      isLoading={isPending}
      leadOptions={leadOptions}
    />
  );
}
