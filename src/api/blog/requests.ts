import httpInstance from '../http-instance';
import { KEYS } from './keys';
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

export const getBlogList = (params: GetBlogListParams, signal?: AbortSignal) => {
  return httpInstance.get<GetBlogListResponse>(KEYS.BLOGS, { params, signal }).then((res) => res);
};

export const getBlogDetail = (
  params: GetBlogDetailParams,
  signal?: AbortSignal
): Promise<GetBlogDetailResponse> => {
  const url = KEYS.BLOG_DETAIL.replace(':id', params.id);
  return httpInstance.get<GetBlogDetailResponse>(url, { signal }).then((res) => res);
};

export const createBlog = (data: CreateBlogParams): Promise<CreateBlogResponse> => {
  return httpInstance.post<CreateBlogResponse>(KEYS.CREATE_BLOG, data).then((res) => res);
};

export const updateBlog = (data: UpdateBlogParams): Promise<UpdateBlogResponse> => {
  const url = KEYS.UPDATE_BLOG.replace(':id', data.id);
  return httpInstance.put<UpdateBlogResponse>(url, data).then((res) => res);
};

export const deleteBlog = (params: DeleteBlogParams): Promise<DeleteBlogResponse> => {
  const url = KEYS.DELETE_BLOG.replace(':id', params.id);
  return httpInstance.delete<DeleteBlogResponse>(url).then((res) => res);
};
