import { BlogListContainer } from '@/modules/blog-management';

export const metadata = {
  title: 'Blog',
};

export default function BlogPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Blog</h1>
        <p className='text-gray-600'>Manage blog posts and articles</p>
      </div>

      <BlogListContainer />
    </div>
  );
}
