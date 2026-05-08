import { CategoryListContainer } from '@/modules/category-management';

export const metadata = {
  title: 'Categories',
};

export default function CategoriesPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Categories</h1>
        <p className='text-gray-600'>Manage product categories</p>
      </div>

      <CategoryListContainer />
    </div>
  );
}
