import { LeadListContainer } from '@/modules/lead-management';

export const metadata = {
  title: 'Leads',
};

export default function LeadsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Leads</h1>
        <p className='text-gray-600'>Manage customer enquiries</p>
      </div>

      <LeadListContainer />
    </div>
  );
}
