'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { ICategory } from '@/api/categories';

interface CategoryListUIProps {
  categories: ICategory[];
  total: number;
  isLoading: boolean;
  search: string;
  onSearchChange: (search: string) => void;
  offset: number;
  limit: number;
  onOffsetChange: (offset: number) => void;
}

export function CategoryListUI({
  categories,
  total,
  isLoading,
  search,
  onSearchChange,
  offset,
  limit,
  onOffsetChange,
}: CategoryListUIProps) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Input
          placeholder='Search categories...'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className='max-w-xs'
        />
        <Button>Add Category</Button>
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
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className='py-8 text-center text-gray-500'>
                    No categories found
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className='font-medium'>{category.name}</TableCell>
                    <TableCell className='text-gray-600'>{category.slug}</TableCell>
                    <TableCell className='max-w-xs truncate'>{category.description}</TableCell>
                    <TableCell className='space-x-2 text-right'>
                      <Button size='sm' variant='outline'>
                        Edit
                      </Button>
                      <Button size='sm' variant='destructive'>
                        Delete
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
