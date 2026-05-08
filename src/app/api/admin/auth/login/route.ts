import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { adminLoginSchema } from '@/lib/schemas/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.parse(body);

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.email,
      password: parsed.password,
    });

    if (error || !data.session) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify user exists in admin_users table (T-02-006: not just any Supabase user)
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id, email')
      .eq('email', parsed.email)
      .single();

    if (adminError || !adminUser) {
      // Sign out the Supabase session since this user is not an admin
      await supabase.auth.signOut();
      return NextResponse.json({ error: 'Admin account not found' }, { status: 403 });
    }

    return NextResponse.json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      admin_id: adminUser.id,
      admin_email: adminUser.email,
      expiresAt: data.session.expires_at,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    // ZodError from zod v4 may not have name === 'ZodError'
    if (typeof error === 'object' && error !== null && 'issues' in error) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
