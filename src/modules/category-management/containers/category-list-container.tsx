'use client';

import { useMemo } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { useCategoryListContainer } from '../hooks/use-category-list';
import { createColumns } from '../components/category-list-ui/create-columns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function CategoryListContainer() {
  const { data, isLoading, isFetching, tableData, handlers } = useCategoryListContainer();
  const columns = useMemo(() => createColumns({}), []);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Input
          placeholder='Search categories...'
          onChange={(e) => handlers.onSearchChange(e.target.value)}
          className='max-w-xs'
        />
        <Button>Add Category</Button>
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
