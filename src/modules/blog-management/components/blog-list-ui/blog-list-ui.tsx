'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { IBlogPost } from '@/api/blog';

type BlogPost = IBlogPost;

interface BlogListUIProps {
  posts: BlogPost[];
  total: number;
  isLoading: boolean;
  search: string;
  onSearchChange: (search: string) => void;
  published: string;
  onPublishedChange: (val: string) => void;
  offset: number;
  limit: number;
  onOffsetChange: (offset: number) => void;
}

export function BlogListUI({
  posts,
  total,
  isLoading,
  search,
  onSearchChange,
  published,
  onPublishedChange,
  offset,
  limit,
  onOffsetChange,
}: BlogListUIProps) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-3'>
        <Input
          placeholder='Search by title or slug...'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className='max-w-xs'
        />
        <Select value={published || 'all'} onValueChange={(v) => onPublishedChange(v === 'all' ? '' : v)}>
          <SelectTrigger className='w-44'>
            <SelectValue placeholder='Published status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Posts</SelectItem>
            <SelectItem value='true'>Published</SelectItem>
            <SelectItem value='false'>Drafts</SelectItem>
          </SelectContent>
        </Select>
        <Button className='ml-auto'>New Post</Button>
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
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Excerpt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className='py-8 text-center text-gray-500'>
                    No blog posts found
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className='font-medium'>{post.title}</TableCell>
                    <TableCell className='text-gray-600'>{post.slug}</TableCell>
                    <TableCell className='max-w-xs truncate text-sm text-gray-500'>
                      {'—'}
                    </TableCell>
                    <TableCell>
                      {post.status === 'published' ? (
                        <Badge variant='default'>Published</Badge>
                      ) : (
                        <Badge variant='secondary'>Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell className='text-sm text-gray-600'>
                      {new Date(post.created_at).toLocaleDateString('vi-VN')}
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
