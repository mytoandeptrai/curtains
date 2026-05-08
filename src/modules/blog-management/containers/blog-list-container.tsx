'use client';

import { BlogListUI } from '../components/blog-list-ui/blog-list-ui';
import { useBlogList } from '../hooks/use-blog-list';

export function BlogListContainer() {
  const { data, total, isLoading, search, setSearch, published, setPublished, offset, setOffset, limit } =
    useBlogList();

  return (
    <BlogListUI
      posts={data}
      total={total}
      isLoading={isLoading}
      search={search}
      onSearchChange={setSearch}
      published={published}
      onPublishedChange={setPublished}
      offset={offset}
      limit={limit}
      onOffsetChange={setOffset}
    />
  );
}
