'use client';

import { DataTableColumnHeader } from '@/components/ui/data-table';
import { type IBlogPost } from '@/api/blog';
import { type ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface CreateColumnsProps {
  t?: any;
}

export const createColumns = ({ t }: CreateColumnsProps): ColumnDef<IBlogPost>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => <div className='font-medium'>{row.original.id}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
    cell: ({ row }) => <div className='font-medium'>{row.original.title}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Slug' />,
    cell: ({ row }) => <div className='text-gray-600'>{row.original.slug}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const status = row.original.status;
      return status === 'published' ? (
        <Badge variant='default'>Published</Badge>
      ) : (
        <Badge variant='secondary'>Draft</Badge>
      );
    },
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
