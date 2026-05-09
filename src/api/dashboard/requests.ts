import httpInstance from '../http-instance';
import { KEYS } from './keys';
import type { GetDashboardStatsResponse } from './types';

export const getDashboardStats = (signal?: AbortSignal): Promise<GetDashboardStatsResponse> => {
  return httpInstance.get<GetDashboardStatsResponse>(KEYS.DASHBOARD_STATS, { signal }).then((res) => res);
};
