import { CategoryEditContainer } from '@/modules/category-management';

export const metadata = {
  title: 'Edit Category',
};

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Category</h1>
        <p className="text-gray-600">Update category information</p>
      </div>

      <CategoryEditContainer id={id} />
    </div>
  );
}
