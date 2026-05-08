'use client';

import { CategoryListUI } from '../components/category-list-ui/category-list-ui';
import { useCategoryList } from '../hooks/use-category-list';

export function CategoryListContainer() {
  const { data, total, isLoading, search, setSearch, offset, setOffset, limit } = useCategoryList();

  return (
    <CategoryListUI
      categories={data}
      total={total}
      isLoading={isLoading}
      search={search}
      onSearchChange={setSearch}
      offset={offset}
      limit={limit}
      onOffsetChange={setOffset}
    />
  );
}
