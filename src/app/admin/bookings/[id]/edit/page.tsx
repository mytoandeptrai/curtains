import { BookingEditContainer } from '@/modules/booking-management';

export const metadata = {
  title: 'Edit Booking',
};

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Booking</h1>
        <p className="text-gray-600">Update booking details and status</p>
      </div>

      <BookingEditContainer id={id} />
    </div>
  );
}
