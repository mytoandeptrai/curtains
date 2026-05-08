import { DashboardContainer } from '@/modules/dashboard';

export const metadata = {
  title: 'Admin Dashboard',
};

export default function AdminPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <p className='text-gray-600'>Overview of your business</p>
      </div>

      <DashboardContainer />
    </div>
  );
}
