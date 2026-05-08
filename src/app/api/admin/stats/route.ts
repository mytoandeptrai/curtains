import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const { count: leadsToday } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())
      .is('deleted_at', null);

    const { count: leadsWeek } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString())
      .is('deleted_at', null);

    const { count: leadsMonth } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', monthAgo.toISOString())
      .is('deleted_at', null);

    const { count: totalLeads } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .is('deleted_at', null);

    const { count: confirmedBookings } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'confirmed')
      .is('deleted_at', null);

    const conversionRate =
      totalLeads && totalLeads > 0
        ? Math.round(((confirmedBookings || 0) / totalLeads) * 100)
        : 0;

    const { data: leadsWithProducts } = await supabase
      .from('leads')
      .select('product_id, products(id, name)')
      .is('deleted_at', null)
      .not('product_id', 'is', null);

    const productCounts: Record<string, { name: string; count: number }> = {};
    leadsWithProducts?.forEach((lead: any) => {
      if (lead.product_id && lead.products) {
        const key = lead.product_id;
        if (!productCounts[key]) {
          productCounts[key] = { name: lead.products.name, count: 0 };
        }
        productCounts[key].count++;
      }
    });

    const topProducts = Object.entries(productCounts)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 5)
      .map(([, product]) => product);

    return NextResponse.json({
      leads: {
        today: leadsToday || 0,
        week: leadsWeek || 0,
        month: leadsMonth || 0,
      },
      conversionRate,
      confirmedBookings: confirmedBookings || 0,
      topProducts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
