import httpInstance from '../http-instance';
import { KEYS } from './keys';
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

export const getLeadList = (params: GetLeadListParams, signal?: AbortSignal) => {
  return httpInstance.get<GetLeadListResponse>(KEYS.LEADS, { params, signal }).then((res) => res);
};

export const getLeadDetail = (
  params: GetLeadDetailParams,
  signal?: AbortSignal
): Promise<GetLeadDetailResponse> => {
  const url = KEYS.LEAD_DETAIL.replace(':id', params.id);
  return httpInstance.get<GetLeadDetailResponse>(url, { signal }).then((res) => res);
};

export const createLead = (data: CreateLeadParams): Promise<CreateLeadResponse> => {
  return httpInstance.post<CreateLeadResponse>(KEYS.CREATE_LEAD, data).then((res) => res);
};

export const updateLead = (data: UpdateLeadParams): Promise<UpdateLeadResponse> => {
  const url = KEYS.UPDATE_LEAD.replace(':id', data.id);
  return httpInstance.put<UpdateLeadResponse>(url, data).then((res) => res);
};

export const deleteLead = (params: DeleteLeadParams): Promise<DeleteLeadResponse> => {
  const url = KEYS.DELETE_LEAD.replace(':id', params.id);
  return httpInstance.delete<DeleteLeadResponse>(url).then((res) => res);
};
