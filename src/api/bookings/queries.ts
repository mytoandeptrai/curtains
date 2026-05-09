import { useMutation, useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { KEYS } from './keys';
import {
  createBooking,
  deleteBooking,
  getBookingDetail,
  getBookingList,
  updateBooking,
} from './requests';
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

export const useGetBookingList = (
  params: GetBookingListParams,
  options?: Omit<UseQueryOptions<GetBookingListResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetBookingListResponse, Error>({
    queryKey: [KEYS.BOOKINGS, params],
    queryFn: ({ signal }) => getBookingList(params, signal),
    ...options,
  });
};

export const useGetBookingDetail = (
  params: GetBookingDetailParams,
  options?: Omit<UseQueryOptions<GetBookingDetailResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetBookingDetailResponse, Error>({
    queryKey: [KEYS.BOOKING_DETAIL, params],
    queryFn: ({ signal }) => getBookingDetail(params, signal),
    ...options,
  });
};

export const useCreateBookingMutation = () => {
  return useMutation<CreateBookingResponse, Error, CreateBookingParams>({
    mutationKey: [KEYS.CREATE_BOOKING],
    mutationFn: (data: CreateBookingParams) => createBooking(data),
  });
};

export const useUpdateBookingMutation = () => {
  return useMutation<UpdateBookingResponse, Error, UpdateBookingParams>({
    mutationKey: [KEYS.UPDATE_BOOKING],
    mutationFn: (data: UpdateBookingParams) => updateBooking(data),
  });
};

export const useDeleteBookingMutation = () => {
  return useMutation<DeleteBookingResponse, Error, DeleteBookingParams>({
    mutationKey: [KEYS.DELETE_BOOKING],
    mutationFn: (params: DeleteBookingParams) => deleteBooking(params),
  });
};
