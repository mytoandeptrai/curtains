import { useMutation, useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { KEYS } from './keys';
import {
  createProduct,
  deleteProduct,
  getProductDetail,
  getProductList,
  updateProduct,
} from './requests';
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

export const useGetProductList = (
  params: GetProductListParams,
  options?: Omit<UseQueryOptions<GetProductListResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetProductListResponse, Error>({
    queryKey: [KEYS.PRODUCTS, params],
    queryFn: ({ signal }) => getProductList(params, signal),
    ...options,
  });
};

export const useGetProductDetail = (
  params: GetProductDetailParams,
  options?: Omit<UseQueryOptions<GetProductDetailResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetProductDetailResponse, Error>({
    queryKey: [KEYS.PRODUCT_DETAIL, params],
    queryFn: ({ signal }) => getProductDetail(params, signal),
    ...options,
  });
};

export const useCreateProductMutation = () => {
  return useMutation<CreateProductResponse, Error, CreateProductParams>({
    mutationKey: [KEYS.CREATE_PRODUCT],
    mutationFn: (data: CreateProductParams) => createProduct(data),
  });
};

export const useUpdateProductMutation = () => {
  return useMutation<UpdateProductResponse, Error, UpdateProductParams>({
    mutationKey: [KEYS.UPDATE_PRODUCT],
    mutationFn: (data: UpdateProductParams) => updateProduct(data),
  });
};

export const useDeleteProductMutation = () => {
  return useMutation<DeleteProductResponse, Error, DeleteProductParams>({
    mutationKey: [KEYS.DELETE_PRODUCT],
    mutationFn: (params: DeleteProductParams) => deleteProduct(params),
  });
};
