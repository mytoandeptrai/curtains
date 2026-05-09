import { CategoryCreateContainer } from '@/modules/category-management';

export const metadata = {
  title: 'Create Category',
};

export default function CreateCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Category</h1>
        <p className="text-gray-600">Add a new product category</p>
      </div>

      <CategoryCreateContainer />
    </div>
  );
}
