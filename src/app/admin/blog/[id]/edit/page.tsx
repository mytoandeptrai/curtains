import { BlogEditContainer } from '@/modules/blog-management';

export const metadata = {
  title: 'Edit Blog Post',
};

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-gray-600">Update blog post content and settings</p>
      </div>

      <BlogEditContainer id={id} />
    </div>
  );
}
