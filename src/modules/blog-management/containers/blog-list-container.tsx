'use client';

import { useMemo } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { useBlogListContainer } from '../hooks/use-blog-list';
import { createColumns } from '../components/blog-list-ui/create-columns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function BlogListContainer() {
  const { data, isLoading, isFetching, tableData, handlers } = useBlogListContainer();
  const columns = useMemo(() => createColumns({}), []);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Input
          placeholder='Search blog posts...'
          onChange={(e) => handlers.onSearchChange(e.target.value)}
          className='max-w-xs'
        />
        <Button>Add Blog Post</Button>
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
