import { BookingListContainer } from '@/modules/booking-management';

export const metadata = {
  title: 'Bookings',
};

export default function BookingsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Bookings</h1>
        <p className='text-gray-600'>Manage customer appointments</p>
      </div>

      <BookingListContainer />
    </div>
  );
}
