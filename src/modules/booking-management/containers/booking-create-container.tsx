'use client';

import { useBookingCreate } from '../hooks/use-booking-create';
import { BookingCreateUI } from '../components/booking-create-ui/booking-create-ui';

export function BookingCreateContainer() {
  const { onSubmit, isLoading, leadOptions } = useBookingCreate();

  return (
    <BookingCreateUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      leadOptions={leadOptions}
    />
  );
}
