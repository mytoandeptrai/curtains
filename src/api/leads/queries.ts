import { useMutation, useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { KEYS } from './keys';
import {
  createLead,
  deleteLead,
  getLeadDetail,
  getLeadList,
  updateLead,
} from './requests';
import type {
  CreateLeadParams,
  CreateLeadResponse,
  DeleteLeadParams,
  DeleteLeadResponse,
  GetLeadDetailParams,
  GetLeadDetailResponse,
  GetLeadListParams,
  GetLeadListResponse,
  UpdateLeadParams,
  UpdateLeadResponse,
} from './types';

export const useGetLeadList = (
  params: GetLeadListParams,
  options?: Omit<UseQueryOptions<GetLeadListResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetLeadListResponse, Error>({
    queryKey: [KEYS.LEADS, params],
    queryFn: ({ signal }) => getLeadList(params, signal),
    ...options,
  });
};

export const useGetLeadDetail = (
  params: GetLeadDetailParams,
  options?: Omit<UseQueryOptions<GetLeadDetailResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetLeadDetailResponse, Error>({
    queryKey: [KEYS.LEAD_DETAIL, params],
    queryFn: ({ signal }) => getLeadDetail(params, signal),
    ...options,
  });
};

export const useCreateLeadMutation = () => {
  return useMutation<CreateLeadResponse, Error, CreateLeadParams>({
    mutationKey: [KEYS.CREATE_LEAD],
    mutationFn: (data: CreateLeadParams) => createLead(data),
  });
};

export const useUpdateLeadMutation = () => {
  return useMutation<UpdateLeadResponse, Error, UpdateLeadParams>({
    mutationKey: [KEYS.UPDATE_LEAD],
    mutationFn: (data: UpdateLeadParams) => updateLead(data),
  });
};

export const useDeleteLeadMutation = () => {
  return useMutation<DeleteLeadResponse, Error, DeleteLeadParams>({
    mutationKey: [KEYS.DELETE_LEAD],
    mutationFn: (params: DeleteLeadParams) => deleteLead(params),
  });
};
