'use client';

import { DataTableColumnHeader } from '@/components/ui/data-table';
import { type ICategory } from '@/api/categories';
import { type ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';

interface CreateColumnsProps {
  t?: any;
}

export const createColumns = ({ t }: CreateColumnsProps): ColumnDef<ICategory>[] => [
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
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Description' />,
    cell: ({ row }) => <div className='max-w-xs truncate'>{row.original.description}</div>,
    enableSorting: false,
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
