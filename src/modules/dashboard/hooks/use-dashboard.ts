'use client';

import { useGetDashboardStats } from '@/api/dashboard';
import { useMemo } from 'react';
import type { DashboardStats } from './use-dashboard-stats';

export function useDashboard() {
  const { data, isLoading, isFetching, error } = useGetDashboardStats({
    refetchInterval: 60000, // Refresh stats every 60 seconds
  });

  const transformedData = useMemo(() => {
    if (!data?.data) return null;

    return {
      leads: {
        today: data.data.totalLeadsToday,
        week: data.data.totalLeadsThisWeek,
        month: data.data.totalLeads,
      },
      conversionRate: data.data.conversionRate,
      confirmedBookings: data.data.confirmedBookings,
      topProducts: data.data.popularProducts.map((p) => ({
        name: p.name,
        count: p.lead_count,
      })),
    } as DashboardStats;
  }, [data?.data]);

  return {
    data: transformedData,
    isLoading,
    isFetching,
    error,
  };
}
