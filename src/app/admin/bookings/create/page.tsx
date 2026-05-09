import { BookingCreateContainer } from '@/modules/booking-management';

export const metadata = {
  title: 'Create Booking',
};

export default function CreateBookingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Booking</h1>
        <p className="text-gray-600">Schedule a new installation booking</p>
      </div>

      <BookingCreateContainer />
    </div>
  );
}
