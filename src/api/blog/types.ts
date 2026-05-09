import type { BaseResponseType, IPaginatedResponseType } from '@/types';

export enum BlogStatus {
  Draft = 'draft',
  Published = 'published',
}

export interface IBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  featured_image?: string;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
}

export interface GetBlogListParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  search?: string;
  status?: 'draft' | 'published';
}

export interface GetBlogListResponse extends IPaginatedResponseType<IBlogPost[]> {}

export interface GetBlogDetailParams {
  id: string;
}

export interface GetBlogDetailResponse extends BaseResponseType<IBlogPost> {}

export interface CreateBlogParams {
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  featured_image?: string;
  seo_title: string;
  seo_description: string;
}

export interface UpdateBlogParams extends CreateBlogParams {
  id: string;
}

export interface DeleteBlogParams {
  id: string;
}

export interface CreateBlogResponse extends BaseResponseType<IBlogPost> {}

export interface UpdateBlogResponse extends BaseResponseType<IBlogPost> {}

export interface DeleteBlogResponse extends BaseResponseType<IBlogPost> {}
