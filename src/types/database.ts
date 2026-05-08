// Database entity types matching Supabase schema
// Field names are exact matches to database column names
// Timestamps are ISO strings (Supabase returns ISO 8601 format)

export type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  deleted_at: string | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  featured: boolean;
  category_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type ProductExtra = {
  id: string;
  product_id: string;
  type: 'fixed' | 'per-m2';
  amount: number;
  name: string;
  created_at: string;
  deleted_at: string | null;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type ProductImage = {
  id: string;
  product_id: string;
  variant_id: string | null;
  image_url: string;
  is_featured: boolean;
  created_at: string;
  deleted_at: string | null;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  address: string;
  product_id: string | null;
  width: number | null;
  height: number | null;
  estimated_price: number | null;
  status: 'new' | 'contacted' | 'closed';
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Booking = {
  id: string;
  lead_id: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'done';
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail_url: string | null;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
