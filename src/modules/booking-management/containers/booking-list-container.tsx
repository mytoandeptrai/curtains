'use client';

import { useMemo } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { useBookingListContainer } from '../hooks/use-booking-list';
import { createColumns } from '../components/booking-list-ui/create-columns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function BookingListContainer() {
  const { data, isLoading, isFetching, tableData, handlers } = useBookingListContainer();
  const columns = useMemo(() => createColumns({}), []);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Input
          placeholder='Search bookings...'
          onChange={(e) => handlers.onSearchChange(e.target.value)}
          className='max-w-xs'
        />
        <Button>Add Booking</Button>
      </div>

      <DataTable
        columns={columns}
        data={tableData.data}
        pagination={tableData.pagination}
        isInitialLoading={isLoading}
        isDataFetching={isFetching}
        onPaginationChange={handlers.onPaginationChange}
        onSortingChange={handlers.onSortingChange}
      />
    </div>
  );
}
