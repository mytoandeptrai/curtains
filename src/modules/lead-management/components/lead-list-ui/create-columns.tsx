'use client';

import { DataTableColumnHeader } from '@/components/ui/data-table';
import { type ILead } from '@/api/leads';
import { type ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface CreateColumnsProps {
  t?: any;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-gray-100 text-gray-800',
};

export const createColumns = ({ t }: CreateColumnsProps): ColumnDef<ILead>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => <div className='font-medium'>{row.original.id}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'customer_name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Customer Name' />,
    cell: ({ row }) => <div className='font-medium'>{row.original.customer_name}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'customer_email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='text-gray-600'>{row.original.customer_email}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'customer_phone',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Phone' />,
    cell: ({ row }) => <div className='text-gray-600'>{row.original.customer_phone}</div>,
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
