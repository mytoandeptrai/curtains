import { LeadEditContainer } from '@/modules/lead-management';

export const metadata = {
  title: 'Edit Lead',
};

export default async function EditLeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Lead</h1>
        <p className="text-gray-600">Update lead information and status</p>
      </div>

      <LeadEditContainer id={id} />
    </div>
  );
}
