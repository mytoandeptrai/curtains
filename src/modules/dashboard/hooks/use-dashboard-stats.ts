'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface DashboardStats {
  leads: {
    today: number;
    week: number;
    month: number;
  };
  conversionRate: number;
  confirmedBookings: number;
  topProducts: Array<{ name: string; count: number }>;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/stats');

        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }

        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        toast.error('Failed to load dashboard statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
}
