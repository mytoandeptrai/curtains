'use client';

import { useGetProductList, type IProduct } from '@/api/products';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useMemo } from 'react';
import { type SortingState } from '@tanstack/react-table';

interface UseProductListContainerReturn {
  data: IProduct[];
  isLoading: boolean;
  isFetching: boolean;
  tableData: {
    data: IProduct[];
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

export function useProductListContainer(): UseProductListContainerReturn {
  const [query, setQuery] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(20),
    sortBy: parseAsString.withDefault('name'),
    orderBy: parseAsString.withDefault('asc'),
    search: parseAsString.withDefault(''),
    category: parseAsString.withDefault(''),
  });

  const { data, isLoading, isFetching } = useGetProductList(
    {
      page: query.page,
      pageSize: query.pageSize,
      sortBy: query.sortBy,
      orderBy: query.orderBy as 'asc' | 'desc',
      search: query.search,
      category: query.category || undefined,
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
        sortBy: 'name',
        orderBy: 'asc',
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

// Keep old export for backward compatibility
export interface Product extends IProduct {}
export function useProductList() {
  const container = useProductListContainer();
  return {
    data: container.data,
    total: container.tableData.pagination.pageSize * container.tableData.pagination.pageCount,
    isLoading: container.isLoading,
    error: null,
    search: '',
    setSearch: () => {},
    categoryId: '',
    setCategoryId: () => {},
    featured: '',
    setFeatured: () => {},
    offset: 0,
    setOffset: () => {},
    limit: 20,
    refetch: () => {},
  };
}
