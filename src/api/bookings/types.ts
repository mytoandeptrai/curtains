import type { BaseResponseType, IPaginatedResponseType } from '@/types';

export interface IBooking {
  id: string;
  lead_id: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'done';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface GetBookingListParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  search?: string;
  status?: 'pending' | 'confirmed' | 'done';
  lead_id?: string;
}

export interface GetBookingListResponse extends IPaginatedResponseType<IBooking[]> {}

export interface GetBookingDetailParams {
  id: string;
}

export interface GetBookingDetailResponse extends BaseResponseType<IBooking> {}

export interface CreateBookingParams {
  lead_id: string;
  booking_date: string;
  booking_time: string;
  status?: 'pending' | 'confirmed' | 'done';
  notes?: string;
}

export interface UpdateBookingParams extends CreateBookingParams {
  id: string;
}

export interface DeleteBookingParams {
  id: string;
}

export interface CreateBookingResponse extends BaseResponseType<IBooking> {}

export interface UpdateBookingResponse extends BaseResponseType<IBooking> {}

export interface DeleteBookingResponse extends BaseResponseType<IBooking> {}
