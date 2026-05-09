'use client';

import { DashboardUI } from '../components/dashboard-ui/dashboard-ui';
import { useDashboardStats } from '../hooks/use-dashboard-stats';

export function DashboardContainer() {
  const { stats, isLoading } = useDashboardStats();

  return <DashboardUI stats={stats} isLoading={isLoading} />;
}
