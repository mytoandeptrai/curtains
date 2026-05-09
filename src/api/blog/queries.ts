import { useMutation, useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { KEYS } from './keys';
import {
  createBlog,
  deleteBlog,
  getBlogDetail,
  getBlogList,
  updateBlog,
} from './requests';
import type {
  CreateBlogParams,
  CreateBlogResponse,
  DeleteBlogParams,
  DeleteBlogResponse,
  GetBlogDetailParams,
  GetBlogDetailResponse,
  GetBlogListParams,
  GetBlogListResponse,
  UpdateBlogParams,
  UpdateBlogResponse,
} from './types';

export const useGetBlogList = (
  params: GetBlogListParams,
  options?: Omit<UseQueryOptions<GetBlogListResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetBlogListResponse, Error>({
    queryKey: [KEYS.BLOGS, params],
    queryFn: ({ signal }) => getBlogList(params, signal),
    ...options,
  });
};

export const useGetBlogDetail = (
  params: GetBlogDetailParams,
  options?: Omit<UseQueryOptions<GetBlogDetailResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetBlogDetailResponse, Error>({
    queryKey: [KEYS.BLOG_DETAIL, params],
    queryFn: ({ signal }) => getBlogDetail(params, signal),
    ...options,
  });
};

export const useCreateBlogMutation = () => {
  return useMutation<CreateBlogResponse, Error, CreateBlogParams>({
    mutationKey: [KEYS.CREATE_BLOG],
    mutationFn: (data: CreateBlogParams) => createBlog(data),
  });
};

export const useUpdateBlogMutation = () => {
  return useMutation<UpdateBlogResponse, Error, UpdateBlogParams>({
    mutationKey: [KEYS.UPDATE_BLOG],
    mutationFn: (data: UpdateBlogParams) => updateBlog(data),
  });
};

export const useDeleteBlogMutation = () => {
  return useMutation<DeleteBlogResponse, Error, DeleteBlogParams>({
    mutationKey: [KEYS.DELETE_BLOG],
    mutationFn: (params: DeleteBlogParams) => deleteBlog(params),
  });
};
