import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface LeadNotificationData {
  lead_id: string;
  lead_name: string;
  lead_phone: string;
  lead_address: string;
  product_name: string;
  estimated_price: number;
  created_at: string;
}

/**
 * Send email notification to admin when new lead arrives
 */
export async function sendLeadNotificationEmail(data: LeadNotificationData) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

  const priceFormatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(data.estimated_price);

  const submittedAt = new Date(data.created_at).toLocaleString('vi-VN');
  const adminUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/leads`;

  const emailHtml = `
    <h2>New Lead Received</h2>
    <p>A new lead has been submitted. Here are the details:</p>
    <ul>
      <li><strong>Name:</strong> ${data.lead_name}</li>
      <li><strong>Phone:</strong> ${data.lead_phone}</li>
      <li><strong>Address:</strong> ${data.lead_address}</li>
      <li><strong>Product:</strong> ${data.product_name}</li>
      <li><strong>Estimated Price:</strong> ${priceFormatted}</li>
      <li><strong>Submitted:</strong> ${submittedAt}</li>
    </ul>
    <p>
      <a href="${adminUrl}">View in admin dashboard</a>
    </p>
  `;

  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@curtains.com',
      to: adminEmail,
      subject: `New Lead: ${data.lead_name}`,
      html: emailHtml,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response;
  } catch (error) {
    console.error('Failed to send lead notification email:', error);
    throw error;
  }
}

/**
 * Send confirmation email to customer
 * Prepared for Phase 2 when leads come from public form
 */
export async function sendLeadConfirmationEmail(
  customerEmail: string,
  customerName: string,
  data: LeadNotificationData
) {
  const priceFormatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(data.estimated_price);

  const emailHtml = `
    <h2>Lead Submission Confirmed</h2>
    <p>Thank you ${customerName} for your interest in our products!</p>
    <p>We have received your request for <strong>${data.product_name}</strong>.</p>
    <p><strong>Estimated price:</strong> ${priceFormatted}</p>
    <p>Our team will contact you shortly at ${data.lead_phone}.</p>
    <p>Thank you!</p>
  `;

  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@curtains.com',
      to: customerEmail,
      subject: `Confirmation: Your ${data.product_name} Inquiry`,
      html: emailHtml,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response;
  } catch (error) {
    console.error('Failed to send lead confirmation email:', error);
    throw error;
  }
}
