'use client';

import { useBookingCreateForm } from '../hooks/use-booking-create';
import { BookingCreateUI } from '../components/booking-create-ui/booking-create-ui';

export function BookingCreateContainer() {
  const { onSubmit, isPending } = useBookingCreateForm();

  return (
    <BookingCreateUI
      onSubmit={onSubmit}
      isLoading={isPending}
    />
  );
}
