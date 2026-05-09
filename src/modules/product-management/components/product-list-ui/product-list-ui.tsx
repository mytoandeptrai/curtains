'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { IProduct } from '@/api/products';

interface ProductListUIProps {
  products: IProduct[];
  total: number;
  isLoading: boolean;
  search: string;
  onSearchChange: (search: string) => void;
  featured: string;
  onFeaturedChange: (val: string) => void;
  offset: number;
  limit: number;
  onOffsetChange: (offset: number) => void;
}

export function ProductListUI({
  products,
  total,
  isLoading,
  search,
  onSearchChange,
  featured,
  onFeaturedChange,
  offset,
  limit,
  onOffsetChange,
}: ProductListUIProps) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-3'>
        <Input
          placeholder='Search products...'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className='max-w-xs'
        />
        <Select value={featured || 'all'} onValueChange={(v) => onFeaturedChange(v === 'all' ? '' : v)}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Featured' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Products</SelectItem>
            <SelectItem value='true'>Featured Only</SelectItem>
            <SelectItem value='false'>Not Featured</SelectItem>
          </SelectContent>
        </Select>
        <Button className='ml-auto'>Add Product</Button>
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
                <TableHead>Category</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='py-8 text-center text-gray-500'>
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className='font-medium'>{product.name}</TableCell>
                    <TableCell>{product.category ?? '—'}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {product.featured ? (
                        <Badge variant='default'>Featured</Badge>
                      ) : (
                        <Badge variant='secondary'>No</Badge>
                      )}
                    </TableCell>
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
