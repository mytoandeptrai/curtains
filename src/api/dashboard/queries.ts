import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { KEYS } from './keys';
import { getDashboardStats } from './requests';
import type { GetDashboardStatsResponse } from './types';

export const useGetDashboardStats = (
  options?: Omit<UseQueryOptions<GetDashboardStatsResponse, Error>, 'queryKey'>
) => {
  return useQuery<GetDashboardStatsResponse, Error>({
    queryKey: [KEYS.DASHBOARD_STATS],
    queryFn: ({ signal }) => getDashboardStats(signal),
    ...options,
  });
};
