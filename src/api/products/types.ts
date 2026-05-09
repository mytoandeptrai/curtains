import type { BaseResponseType, IPaginatedResponseType } from '@/types';

export interface IProduct {
  id: string;
  name: string;
  sku: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  unit: string;
  color: string;
  material: string;
  finish: string;
  category: string;
  image: string;
  featured: boolean;
  variants?: Array<{
    color: string;
    material: string;
    finish: string;
    layers?: string[];
  }>;
  metaTitle?: string;
  metaDescription?: string;
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
  sku: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  unit: string;
  color: string;
  material: string;
  finish: string;
  category: string;
  featured?: boolean;
  variants?: Array<{
    color: string;
    material: string;
    finish: string;
    layers?: string[];
  }>;
  imageUrl?: Array<{
    url?: string;
    file?: File;
  }>;
  images?: Array<{
    url?: string;
    file?: File;
  }>;
  metaTitle?: string;
  metaDescription?: string;
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
