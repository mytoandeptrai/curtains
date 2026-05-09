import type { BaseResponseType } from '@/types';

export interface IDashboardStats {
  totalLeads: number;
  totalLeadsThisWeek: number;
  totalLeadsToday: number;
  conversionRate: number;
  confirmedBookings: number;
  popularProducts: Array<{ id: string; name: string; lead_count: number }>;
  leadsTrend: Array<{ date: string; count: number }>;
}

export interface GetDashboardStatsResponse extends BaseResponseType<IDashboardStats> {}
