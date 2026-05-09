'use client';

import { useBookingEdit } from '../hooks/use-booking-edit';
import { BookingEditUI } from '../components/booking-edit-ui/booking-edit-ui';

interface BookingEditContainerProps {
  id: string;
}

export function BookingEditContainer({ id }: BookingEditContainerProps) {
  const { onSubmit, isLoading, isFetching, defaultValues, leadOptions } = useBookingEdit(id);

  if (isFetching) {
    return <div className="text-muted-foreground">Loading booking...</div>;
  }

  return (
    <BookingEditUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      leadOptions={leadOptions}
      defaultValues={defaultValues}
    />
  );
}
