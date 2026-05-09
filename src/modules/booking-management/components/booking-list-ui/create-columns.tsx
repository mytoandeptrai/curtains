'use client';

import { DataTableColumnHeader } from '@/components/ui/data-table';
import { type IBooking } from '@/api/bookings';
import { type ColumnDef } from '@tanstack/react-table';
import { formatDate, format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface CreateColumnsProps {
  t?: any;
}

const statusColors: Record<string, string> = {
  pending: 'bg-orange-100 text-orange-800',
  confirmed: 'bg-green-100 text-green-800',
  done: 'bg-gray-100 text-gray-800',
};

export const createColumns = ({ t }: CreateColumnsProps): ColumnDef<IBooking>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => <div className='font-medium'>{row.original.id}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'lead_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Lead ID' />,
    cell: ({ row }) => <div className='text-gray-600'>{row.original.lead_id}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'booking_date',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Booking Date' />,
    cell: ({ row }) => (
      <div className='text-gray-600'>
        {formatDate(new Date(row.original.booking_date), 'MMM d, yyyy')}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'booking_time',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Time' />,
    cell: ({ row }) => <div className='text-gray-600'>{row.original.booking_time || '-'}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => (
      <Badge className={statusColors[row.original.status] || 'bg-gray-100 text-gray-800'}>
        {row.original.status}
      </Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Created' />,
    cell: ({ row }) => (
      <div className='text-gray-600'>
        {formatDate(new Date(row.original.created_at), 'MMM d, yyyy')}
      </div>
    ),
    enableSorting: true,
  },
];
