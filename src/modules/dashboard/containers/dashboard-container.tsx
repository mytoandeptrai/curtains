'use client';

import { DashboardUI } from '../components/dashboard-ui/dashboard-ui';
import { useDashboard } from '../hooks/use-dashboard';

export function DashboardContainer() {
  const { data, isLoading, isFetching } = useDashboard();

  return <DashboardUI stats={data} isLoading={isLoading} isFetching={isFetching} />;
}
