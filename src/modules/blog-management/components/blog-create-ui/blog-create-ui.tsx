'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/form-fields/form-input';
import { FormTextarea } from '@/components/form-fields/form-textarea';
import { FormCheckbox } from '@/components/form-fields/form-checkbox';
import { blogCreateSchema } from '@/lib/schemas/blog';
import type { BlogCreate } from '@/lib/schemas/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface BlogCreateUIProps {
  onSubmit: (data: BlogCreate) => Promise<void>;
  isLoading: boolean;
}

export function BlogCreateUI({ onSubmit, isLoading }: BlogCreateUIProps) {
  const form = useForm<BlogCreate>({
    resolver: zodResolver(blogCreateSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      published: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            control={form.control}
            name="title"
            label="Title"
            placeholder="Blog post title"
            required
          />

          <FormInput
            control={form.control}
            name="slug"
            label="Slug"
            placeholder="e.g., how-to-choose-roller-blinds"
            required
          />
        </div>

        <FormTextarea
          control={form.control}
          name="content"
          label="Content (Markdown)"
          placeholder="Write your blog post content in markdown..."
          config={{ rows: 12, showCharCount: false }}
          required
        />

        <FormTextarea
          control={form.control}
          name="excerpt"
          label="Excerpt"
          placeholder="Short summary of the post (shown in listings)..."
          config={{ rows: 3, maxLength: 300, showCharCount: true }}
          required
        />

        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-medium">SEO Settings</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              control={form.control}
              name="seo_title"
              label="SEO Title"
              placeholder="For search engines"
            />

            <FormInput
              control={form.control}
              name="seo_keywords"
              label="SEO Keywords"
              placeholder="Comma-separated keywords"
            />
          </div>

          <FormTextarea
            control={form.control}
            name="seo_description"
            label="SEO Description"
            placeholder="Meta description for search engines"
            config={{ rows: 2, maxLength: 160, showCharCount: true }}
          />
        </div>

        <FormCheckbox
          control={form.control}
          name="published"
          label="Published"
          checkboxLabel="Publish this post immediately"
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
