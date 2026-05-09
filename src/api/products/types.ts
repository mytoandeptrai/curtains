import type { BaseResponseType, IPaginatedResponseType } from '@/types';

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetProductListParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  search?: string;
  category?: string;
  featured?: boolean;
}

export interface GetProductListResponse extends IPaginatedResponseType<IProduct[]> {}

export interface GetProductDetailParams {
  id: string;
}

export interface GetProductDetailResponse extends BaseResponseType<IProduct> {}

export interface CreateProductParams {
  name: string;
  slug: string;
  description?: string;
  price: number;
  category: string;
  featured?: boolean;
  images?: string[];
}

export interface UpdateProductParams extends CreateProductParams {
  id: string;
}

export interface DeleteProductParams {
  id: string;
}

export interface CreateProductResponse extends BaseResponseType<IProduct> {}

export interface UpdateProductResponse extends BaseResponseType<IProduct> {}

export interface DeleteProductResponse extends BaseResponseType<IProduct> {}
