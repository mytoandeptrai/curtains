'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Lead } from '../../hooks/use-lead-list';

const STATUS_VARIANTS: Record<Lead['status'], 'default' | 'secondary' | 'outline'> = {
  new: 'default',
  contacted: 'secondary',
  closed: 'outline',
};

interface LeadListUIProps {
  leads: Lead[];
  total: number;
  isLoading: boolean;
  search: string;
  onSearchChange: (search: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  offset: number;
  limit: number;
  onOffsetChange: (offset: number) => void;
}

export function LeadListUI({
  leads,
  total,
  isLoading,
  search,
  onSearchChange,
  status,
  onStatusChange,
  offset,
  limit,
  onOffsetChange,
}: LeadListUIProps) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-3'>
        <Input
          placeholder='Search by name or phone...'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className='max-w-xs'
        />
        <Select value={status || 'all'} onValueChange={(v) => onStatusChange(v === 'all' ? '' : v)}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Status</SelectItem>
            <SelectItem value='new'>New</SelectItem>
            <SelectItem value='contacted'>Contacted</SelectItem>
            <SelectItem value='closed'>Closed</SelectItem>
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
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className='py-8 text-center text-gray-500'>
                    No leads found
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className='font-medium'>{lead.name}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{lead.products?.name ?? '—'}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANTS[lead.status]}>{lead.status}</Badge>
                    </TableCell>
                    <TableCell className='text-sm text-gray-600'>
                      {new Date(lead.created_at).toLocaleDateString('vi-VN')}
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
