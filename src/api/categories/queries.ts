import { useMutation, useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { KEYS } from './keys';
import {
  createCategory,
  deleteCategory,
  getCategoryDetail,
  getCategoryList,
  updateCategory,
} from './requests';
import type {
  CreateCategoryParams,
  CreateCategoryResponse,
  DeleteCategoryParams,
  DeleteCategoryResponse,
  GetCategoryDetailParams,
  GetCategoryDetailResponse,
  GetCategoryListParams,
  GetCategoryListResponse,
  UpdateCategoryParams,
  UpdateCategoryResponse,
} from './types';

export const useGetCategoryList = (
  params: GetCategoryListParams,
  options?: Omit<UseQueryOptions<GetCategoryListResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetCategoryListResponse, Error>({
    queryKey: [KEYS.CATEGORIES, params],
    queryFn: ({ signal }) => getCategoryList(params, signal),
    ...options,
  });
};

export const useGetCategoryDetail = (
  params: GetCategoryDetailParams,
  options?: Omit<UseQueryOptions<GetCategoryDetailResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetCategoryDetailResponse, Error>({
    queryKey: [KEYS.CATEGORY_DETAIL, params],
    queryFn: ({ signal }) => getCategoryDetail(params, signal),
    ...options,
  });
};

export const useCreateCategoryMutation = () => {
  return useMutation<CreateCategoryResponse, Error, CreateCategoryParams>({
    mutationKey: [KEYS.CREATE_CATEGORY],
    mutationFn: (data: CreateCategoryParams) => createCategory(data),
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation<UpdateCategoryResponse, Error, UpdateCategoryParams>({
    mutationKey: [KEYS.UPDATE_CATEGORY],
    mutationFn: (data: UpdateCategoryParams) => updateCategory(data),
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation<DeleteCategoryResponse, Error, DeleteCategoryParams>({
    mutationKey: [KEYS.DELETE_CATEGORY],
    mutationFn: (params: DeleteCategoryParams) => deleteCategory(params),
  });
};
