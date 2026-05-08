'use client';

import { BookingListUI } from '../components/booking-list-ui/booking-list-ui';
import { useBookingList } from '../hooks/use-booking-list';

export function BookingListContainer() {
  const { data, total, isLoading, status, setStatus, offset, setOffset, limit } = useBookingList();

  return (
    <BookingListUI
      bookings={data}
      total={total}
      isLoading={isLoading}
      status={status}
      onStatusChange={setStatus}
      offset={offset}
      limit={limit}
      onOffsetChange={setOffset}
    />
  );
}
