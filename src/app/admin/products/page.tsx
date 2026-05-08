import { ProductListContainer } from '@/modules/product-management';

export const metadata = {
  title: 'Products',
};

export default function ProductsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Products</h1>
        <p className='text-gray-600'>Manage curtain products</p>
      </div>

      <ProductListContainer />
    </div>
  );
}
