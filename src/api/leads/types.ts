import type { BaseResponseType, IPaginatedResponseType } from '@/types';

export interface ILead {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: 'new' | 'contacted' | 'closed';
  product_id: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface GetLeadListParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  search?: string;
  status?: 'new' | 'contacted' | 'closed';
  product_id?: string;
}

export interface GetLeadListResponse extends IPaginatedResponseType<ILead[]> {}

export interface GetLeadDetailParams {
  id: string;
}

export interface GetLeadDetailResponse extends BaseResponseType<ILead> {}

export interface CreateLeadParams {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_id: string;
  status?: 'new' | 'contacted' | 'closed';
  notes?: string;
}

export interface UpdateLeadParams extends CreateLeadParams {
  id: string;
}

export interface DeleteLeadParams {
  id: string;
}

export interface CreateLeadResponse extends BaseResponseType<ILead> {}

export interface UpdateLeadResponse extends BaseResponseType<ILead> {}

export interface DeleteLeadResponse extends BaseResponseType<ILead> {}
