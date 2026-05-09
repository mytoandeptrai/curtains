'use client';

import { useBookingEditForm } from '../hooks/use-booking-edit';
import { useGetLeadList } from '@/api/leads';
import { BookingEditUI } from '../components/booking-edit-ui/booking-edit-ui';

interface LeadOption {
  value: string;
  label: string;
}

interface BookingEditContainerProps {
  id: string;
}

export function BookingEditContainer({ id }: BookingEditContainerProps) {
  const { onSubmit, isLoading, isFetching, defaultValues } = useBookingEditForm(id);
  const { data: leadsResponse } = useGetLeadList({ page: 1, pageSize: 100 });

  const leadOptions: LeadOption[] = (leadsResponse?.data || []).map((l: { id: string; customer_name: string }) => ({
    value: l.id,
    label: l.customer_name,
  }));

  if (isFetching) {
    return <div className="text-muted-foreground">Loading booking...</div>;
  }

  return (
    <BookingEditUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      defaultValues={defaultValues}
      leadOptions={leadOptions}
    />
  );
}
