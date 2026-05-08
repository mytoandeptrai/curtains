import { productCreateSchema } from '@/lib/schemas/product';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 20;
  const offset = Number(searchParams.get('offset')) || 0;
  const search = searchParams.get('search') || '';
  const category_id = searchParams.get('category_id');
  const featured = searchParams.get('featured');

  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let query = supabase
      .from('products')
      .select(
        `*,
        category:categories(id, name),
        variants:product_variants(id, name, deleted_at),
        images:product_images(id, image_url, is_featured, deleted_at)`,
        { count: 'exact' }
      )
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%`);
    }
    if (category_id) {
      query = query.eq('category_id', category_id);
    }
    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    const { data, count, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      total: count,
      limit,
      offset,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { extras, ...productData } = productCreateSchema.parse(body);

    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (productError) {
      return NextResponse.json({ error: productError.message }, { status: 400 });
    }

    if (extras && extras.length > 0) {
      const extrasData = extras.map((extra) => ({
        ...extra,
        product_id: product.id,
      }));

      await supabase.from('product_extras').insert(extrasData);
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as any).errors },
        { status: 400 }
      );
    }
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
