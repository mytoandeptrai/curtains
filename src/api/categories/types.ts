import type { BaseResponseType, IPaginatedResponseType } from '@/types';

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
}

export interface GetCategoryListParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  search?: string;
}

export interface GetCategoryListResponse extends IPaginatedResponseType<ICategory[]> {}

export interface GetCategoryDetailParams {
  id: string;
}

export interface GetCategoryDetailResponse extends BaseResponseType<ICategory> {}

export interface CreateCategoryParams {
  name: string;
  slug: string;
  description?: string;
  seo_title?: string;
  seo_description?: string;
}

export interface UpdateCategoryParams extends CreateCategoryParams {
  id: string;
}

export interface DeleteCategoryParams {
  id: string;
}

export interface CreateCategoryResponse extends BaseResponseType<ICategory> {}

export interface UpdateCategoryResponse extends BaseResponseType<ICategory> {}

export interface DeleteCategoryResponse extends BaseResponseType<ICategory> {}
