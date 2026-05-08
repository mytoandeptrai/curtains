'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Booking } from '../../hooks/use-booking-list';

const STATUS_VARIANTS: Record<Booking['status'], 'default' | 'secondary' | 'outline'> = {
  pending: 'default',
  confirmed: 'secondary',
  done: 'outline',
};

interface BookingListUIProps {
  bookings: Booking[];
  total: number;
  isLoading: boolean;
  status: string;
  onStatusChange: (status: string) => void;
  offset: number;
  limit: number;
  onOffsetChange: (offset: number) => void;
}

export function BookingListUI({
  bookings,
  total,
  isLoading,
  status,
  onStatusChange,
  offset,
  limit,
  onOffsetChange,
}: BookingListUIProps) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-3'>
        <Select value={status || 'all'} onValueChange={(v) => onStatusChange(v === 'all' ? '' : v)}>
          <SelectTrigger className='w-44'>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Bookings</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='confirmed'>Confirmed</SelectItem>
            <SelectItem value='done'>Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className='space-y-2'>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className='h-12 w-full' />
          ))}
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead Name</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className='py-8 text-center text-gray-500'>
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className='font-medium'>{booking.leads?.name ?? '—'}</TableCell>
                    <TableCell>{new Date(booking.booking_date).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>{booking.booking_time ?? '—'}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANTS[booking.status]}>{booking.status}</Badge>
                    </TableCell>
                    <TableCell className='text-sm text-gray-600'>
                      {new Date(booking.created_at).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell className='space-x-2 text-right'>
                      <Button size='sm' variant='outline'>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-600'>
              Page {currentPage} of {totalPages || 1} ({total} total)
            </p>
            <div className='space-x-2'>
              <Button size='sm' disabled={offset === 0} onClick={() => onOffsetChange(offset - limit)}>
                Previous
              </Button>
              <Button
                size='sm'
                disabled={offset + limit >= total}
                onClick={() => onOffsetChange(offset + limit)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
