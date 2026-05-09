import { BlogCreateContainer } from '@/modules/blog-management';

export const metadata = {
  title: 'Create Blog Post',
};

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Blog Post</h1>
        <p className="text-gray-600">Write and publish a new blog article</p>
      </div>

      <BlogCreateContainer />
    </div>
  );
}
