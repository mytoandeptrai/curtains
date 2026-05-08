'use client';

import { ProductListUI } from '../components/product-list-ui/product-list-ui';
import { useProductList } from '../hooks/use-product-list';

export function ProductListContainer() {
  const { data, total, isLoading, search, setSearch, featured, setFeatured, offset, setOffset, limit } =
    useProductList();

  return (
    <ProductListUI
      products={data}
      total={total}
      isLoading={isLoading}
      search={search}
      onSearchChange={setSearch}
      featured={featured}
      onFeaturedChange={setFeatured}
      offset={offset}
      limit={limit}
      onOffsetChange={setOffset}
    />
  );
}
