import { ProductCreateContainer } from '@/modules/product-management';

export const metadata = {
  title: 'Create Product',
};

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Product</h1>
        <p className="text-gray-600">Add a new curtain product</p>
      </div>

      <ProductCreateContainer />
    </div>
  );
}
