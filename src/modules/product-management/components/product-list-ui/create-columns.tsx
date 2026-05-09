'use client';

import { DataTableColumnHeader } from '@/components/ui/data-table';
import { type IProduct } from '@/api/products';
import { type ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface CreateColumnsProps {
  t?: any;
}

export const createColumns = ({ t }: CreateColumnsProps): ColumnDef<IProduct>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => <div className='font-medium'>{row.original.id}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => <div className='font-medium'>{row.original.name}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Slug' />,
    cell: ({ row }) => <div className='text-gray-600'>{row.original.slug}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Price' />,
    cell: ({ row }) => <div className='font-medium'>${row.original.price.toFixed(2)}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Category' />,
    cell: ({ row }) => <div className='text-gray-600'>{row.original.category}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'featured',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Featured' />,
    cell: ({ row }) => (
      <Badge variant={row.original.featured ? 'default' : 'secondary'}>
        {row.original.featured ? 'Yes' : 'No'}
      </Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Created' />,
    cell: ({ row }) => <div className='text-gray-600'>{formatDate(row.original.created_at, 'MMM d, yyyy')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Updated' />,
    cell: ({ row }) => <div className='text-gray-600'>{formatDate(row.original.updated_at, 'MMM d, yyyy')}</div>,
    enableSorting: true,
  },
];
