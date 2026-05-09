'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { DashboardStats } from '../../hooks/use-dashboard-stats';

interface DashboardUIProps {
  stats: DashboardStats | null | undefined;
  isLoading: boolean;
  isFetching?: boolean;
}

export function DashboardUI({ stats, isLoading, isFetching }: DashboardUIProps) {
  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='grid gap-4 md:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <Card key={i} className='p-6'>
              <Skeleton className='h-8 w-24' />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return <div>Failed to load statistics</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-4'>
        <Card className='p-6'>
          <div className='space-y-2'>
            <p className='text-sm text-gray-600'>Leads Today</p>
            <p className='text-3xl font-bold'>{stats.leads.today}</p>
          </div>
        </Card>

        <Card className='p-6'>
          <div className='space-y-2'>
            <p className='text-sm text-gray-600'>Leads This Week</p>
            <p className='text-3xl font-bold'>{stats.leads.week}</p>
          </div>
        </Card>

        <Card className='p-6'>
          <div className='space-y-2'>
            <p className='text-sm text-gray-600'>Conversion Rate</p>
            <p className='text-3xl font-bold'>{stats.conversionRate}%</p>
          </div>
        </Card>

        <Card className='p-6'>
          <div className='space-y-2'>
            <p className='text-sm text-gray-600'>Confirmed Bookings</p>
            <p className='text-3xl font-bold'>{stats.confirmedBookings}</p>
          </div>
        </Card>
      </div>

      <Card className='p-6'>
        <h3 className='mb-4 text-lg font-semibold'>Popular Products</h3>
        <div className='space-y-2'>
          {stats.topProducts.length > 0 ? (
            stats.topProducts.map((product, idx) => (
              <div key={idx} className='flex justify-between text-sm'>
                <span>{product.name}</span>
                <span className='font-semibold'>{product.count} leads</span>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No products yet</p>
          )}
        </div>
      </Card>
    </div>
  );
}
