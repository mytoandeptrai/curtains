import { ProductEditContainer } from '@/modules/product-management';

export const metadata = {
  title: 'Edit Product',
};

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="text-gray-600">Update product information</p>
      </div>

      <ProductEditContainer id={id} />
    </div>
  );
}
