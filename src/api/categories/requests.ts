import httpInstance from '../http-instance';
import { KEYS } from './keys';
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

export const getCategoryList = (params: GetCategoryListParams, signal?: AbortSignal) => {
  return httpInstance.get<GetCategoryListResponse>(KEYS.CATEGORIES, { params, signal }).then((res) => res);
};

export const getCategoryDetail = (
  params: GetCategoryDetailParams,
  signal?: AbortSignal
): Promise<GetCategoryDetailResponse> => {
  const url = KEYS.CATEGORY_DETAIL.replace(':id', params.id);
  return httpInstance.get<GetCategoryDetailResponse>(url, { signal }).then((res) => res);
};

export const createCategory = (data: CreateCategoryParams): Promise<CreateCategoryResponse> => {
  return httpInstance.post<CreateCategoryResponse>(KEYS.CREATE_CATEGORY, data).then((res) => res);
};

export const updateCategory = (data: UpdateCategoryParams): Promise<UpdateCategoryResponse> => {
  const url = KEYS.UPDATE_CATEGORY.replace(':id', data.id);
  return httpInstance.put<UpdateCategoryResponse>(url, data).then((res) => res);
};

export const deleteCategory = (params: DeleteCategoryParams): Promise<DeleteCategoryResponse> => {
  const url = KEYS.DELETE_CATEGORY.replace(':id', params.id);
  return httpInstance.delete<DeleteCategoryResponse>(url).then((res) => res);
};
