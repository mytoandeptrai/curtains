import httpInstance from '../http-instance';
import { KEYS } from './keys';
import type {
  CreateBookingParams,
  CreateBookingResponse,
  DeleteBookingParams,
  DeleteBookingResponse,
  GetBookingDetailParams,
  GetBookingDetailResponse,
  GetBookingListParams,
  GetBookingListResponse,
  UpdateBookingParams,
  UpdateBookingResponse,
} from './types';

export const getBookingList = (params: GetBookingListParams, signal?: AbortSignal) => {
  return httpInstance.get<GetBookingListResponse>(KEYS.BOOKINGS, { params, signal }).then((res) => res);
};

export const getBookingDetail = (
  params: GetBookingDetailParams,
  signal?: AbortSignal
): Promise<GetBookingDetailResponse> => {
  const url = KEYS.BOOKING_DETAIL.replace(':id', params.id);
  return httpInstance.get<GetBookingDetailResponse>(url, { signal }).then((res) => res);
};

export const createBooking = (data: CreateBookingParams): Promise<CreateBookingResponse> => {
  return httpInstance.post<CreateBookingResponse>(KEYS.CREATE_BOOKING, data).then((res) => res);
};

export const updateBooking = (data: UpdateBookingParams): Promise<UpdateBookingResponse> => {
  const url = KEYS.UPDATE_BOOKING.replace(':id', data.id);
  return httpInstance.put<UpdateBookingResponse>(url, data).then((res) => res);
};

export const deleteBooking = (params: DeleteBookingParams): Promise<DeleteBookingResponse> => {
  const url = KEYS.DELETE_BOOKING.replace(':id', params.id);
  return httpInstance.delete<DeleteBookingResponse>(url).then((res) => res);
};
