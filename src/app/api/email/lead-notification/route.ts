import { NextRequest, NextResponse } from 'next/server';
import { sendLeadNotificationEmail } from '@/lib/email';
import type { LeadNotificationData } from '@/lib/email';

/**
 * Internal endpoint to send lead notification email to admin
 * Called from POST /api/admin/leads or Phase 2 public form submission
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadNotificationData;

    // Validate required fields
    if (!body.lead_name || !body.lead_phone || !body.product_name) {
      return NextResponse.json({ error: 'Missing required fields: lead_name, lead_phone, product_name' }, { status: 400 });
    }

    // Send email
    const result = await sendLeadNotificationEmail(body);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      emailId: result.data?.id,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to send email';
    console.error('Email sending failed:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
