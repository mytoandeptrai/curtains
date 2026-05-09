'use client';

import { useGetBlogList, type IBlogPost } from '@/api/blog';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useMemo } from 'react';
import { type SortingState } from '@tanstack/react-table';

interface UseBlogListContainerReturn {
  data: IBlogPost[];
  isLoading: boolean;
  isFetching: boolean;
  tableData: {
    data: IBlogPost[];
    pagination: {
      pageIndex: number;
      pageSize: number;
      pageCount: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  handlers: {
    onPaginationChange: (page: number, pageSize: number) => void;
    onSortingChange: (sorting: SortingState) => void;
    onSearchChange: (search: string) => void;
  };
}

export function useBlogListContainer(): UseBlogListContainerReturn {
  const [query, setQuery] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(20),
    sortBy: parseAsString.withDefault('created_at'),
    orderBy: parseAsString.withDefault('desc'),
    search: parseAsString.withDefault(''),
    status: parseAsString.withDefault(''),
  });

  const { data, isLoading, isFetching } = useGetBlogList(
    {
      page: query.page,
      pageSize: query.pageSize,
      sortBy: query.sortBy,
      orderBy: query.orderBy as 'asc' | 'desc',
      search: query.search,
      status: query.status ? (query.status as 'draft' | 'published') : undefined,
    },
    {
      placeholderData: (prev) => prev,
    }
  );

  const onPaginationChange = (page: number, pageSize: number) => {
    setQuery({
      page,
      pageSize,
    });
  };

  const onSortingChange = (sorting: SortingState) => {
    if (sorting.length > 0) {
      setQuery({
        sortBy: sorting[0].id,
        orderBy: sorting[0].desc ? 'desc' : 'asc',
      });
    } else {
      setQuery({
        sortBy: 'created_at',
        orderBy: 'desc',
      });
    }
  };

  const onSearchChange = (search: string) => {
    setQuery({
      search,
      page: 1, // Reset to page 1 when searching
    });
  };

  const tableData = useMemo(() => {
    return {
      data: data?.data ?? [],
      pagination: {
        pageIndex: data?.pagination.page ?? 1,
        pageSize: data?.pagination.pageSize ?? 20,
        pageCount: data?.pagination.totalPages ?? 0,
        hasNext: data?.pagination.hasNext ?? false,
        hasPrev: data?.pagination.hasPrev ?? false,
      },
    };
  }, [data]);

  return {
    data: data?.data ?? [],
    isLoading,
    isFetching,
    tableData,
    handlers: {
      onPaginationChange,
      onSortingChange,
      onSearchChange,
    },
  };
}
