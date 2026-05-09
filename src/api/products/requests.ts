import httpInstance from '../http-instance';
import { KEYS } from './keys';
import type {
  CreateProductParams,
  CreateProductResponse,
  DeleteProductParams,
  DeleteProductResponse,
  GetProductDetailParams,
  GetProductDetailResponse,
  GetProductListParams,
  GetProductListResponse,
  UpdateProductParams,
  UpdateProductResponse,
} from './types';

export const getProductList = (params: GetProductListParams, signal?: AbortSignal) => {
  return httpInstance.get<GetProductListResponse>(KEYS.PRODUCTS, { params, signal }).then((res) => res);
};

export const getProductDetail = (
  params: GetProductDetailParams,
  signal?: AbortSignal
): Promise<GetProductDetailResponse> => {
  const url = KEYS.PRODUCT_DETAIL.replace(':id', params.id);
  return httpInstance.get<GetProductDetailResponse>(url, { signal }).then((res) => res);
};

export const createProduct = (data: CreateProductParams): Promise<CreateProductResponse> => {
  return httpInstance.post<CreateProductResponse>(KEYS.CREATE_PRODUCT, data).then((res) => res);
};

export const updateProduct = (data: UpdateProductParams): Promise<UpdateProductResponse> => {
  const url = KEYS.UPDATE_PRODUCT.replace(':id', data.id);
  return httpInstance.put<UpdateProductResponse>(url, data).then((res) => res);
};

export const deleteProduct = (params: DeleteProductParams): Promise<DeleteProductResponse> => {
  const url = KEYS.DELETE_PRODUCT.replace(':id', params.id);
  return httpInstance.delete<DeleteProductResponse>(url).then((res) => res);
};
