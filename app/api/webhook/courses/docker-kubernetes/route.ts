import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

interface RazorpayPaymentEntity {
  id: string;
  amount: number;
  email: string;
  contact?: string;
  order_id?: string;
  notes?: {
    name?: string;
    email?: string;
    phone?: string;
    promo?: string;
    label?: string;
  };
}

interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment?: {
      entity: RazorpayPaymentEntity & { payment_page?: string };
    };
  };
}

const processedPayments = new Set<string>();

setInterval(() => {
  processedPayments.clear();
  logEvent('CACHE_CLEANED', { timestamp: new Date().toISOString() });
}, 60 * 60 * 1000);

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://api.razorpay.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-razorpay-signature',
};

function logEvent(type: string, data: Record<string, unknown>) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}]`, JSON.stringify(data, null, 2));
}

export async function OPTIONS() {
  logEvent('CORS_PREFLIGHT', { method: 'OPTIONS' });
  return NextResponse.json({}, { headers: corsHeaders });
}

function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    );

    logEvent('SIGNATURE_VERIFICATION', { isValid });
    return isValid;
  } catch (error) {
    logEvent('SIGNATURE_VERIFICATION_ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
}

async function storePaymentInDatabase(paymentData: {
  name: string;
  email: string;
  phone?: string;
  amount: number;
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  promo_code?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('docker_kubernetes_payments')
      .insert([{
        name: paymentData.name,
        email: paymentData.email,
        phone: paymentData.phone,
        amount: paymentData.amount,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_order_id: paymentData.razorpay_order_id,
        promo_code: paymentData.promo_code,
        product_type: 'docker_kubernetes_bootcamp',
        status: 'completed'
      }])
      .select();

    if (error) {
      logEvent('DATABASE_INSERT_ERROR', { 
        error: error.message, 
        paymentId: paymentData.razorpay_payment_id 
      });
      throw error;
    }

    logEvent('DATABASE_INSERT_SUCCESS', { 
      paymentId: paymentData.razorpay_payment_id,
      recordId: data?.[0]?.id 
    });

    return data?.[0];
  } catch (error) {
    logEvent('DATABASE_ERROR', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      paymentId: paymentData.razorpay_payment_id 
    });
    throw error;
  }
}

async function sendConfirmationEmail(emailData: { email: string; amount: number; id: string; name?: string; contact?: string }) {
  const { email, amount, id, name } = emailData;
  const amountInRupees = (amount / 100).toFixed(2);
  const firstName = (name || 'Student').split(' ')[0];

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Docker & Kubernetes Bootcamp - Registration Confirmed',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Docker & Kubernetes Bootcamp Registration</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f3f4f6;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
          <tr>
            <td align="center" style="padding:24px;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border:1px solid #e5e7eb; border-radius:8px;">
                <tr>
                  <td align="left" style="background-color:#0f766e; padding:24px; color:#ffffff;">
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; text-transform:uppercase; font-weight:bold; letter-spacing:0.5px; opacity:0.95;">Registration Confirmed</div>
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:22px; font-weight:800; line-height:1.25; margin-top:6px;">Docker & Kubernetes Mastery – 2-Week Live Bootcamp</div>
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; margin-top:6px;">Welcome aboard, ${firstName}!</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom:16px;">
                          <div style="font-family:Arial,Helvetica,sans-serif; font-size:20px; font-weight:700; color:#111827;">Payment Successful</div>
                          <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#6b7280;">Your seat is confirmed.</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:Arial,Helvetica,sans-serif; font-size:15px; color:#374151; line-height:1.6;">
                          <p style="margin:0 0 12px 0;">Hi <strong style="color:#111827;">${firstName}</strong>,</p>
                          <p style="margin:0 0 12px 0;">Thank you for registering for our <strong style="color:#0f766e;">Docker & Kubernetes Mastery – 2-Week Bootcamp</strong>.</p>
                          <p style="margin:0 0 16px 0;">Dates: <strong>6th–17th October, 2025</strong> • Time: <strong>10:00 AM – 11:00 AM IST (Daily)</strong></p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8fafc; border:1px solid #e5e7eb; border-radius:6px;">
                            <tr>
                              <td style="padding:16px; font-family:Arial,Helvetica,sans-serif;">
                                <div style="font-size:16px; font-weight:700; color:#111827; margin-bottom:6px;">What's Next</div>
                                <ul style="padding-left:20px; margin:0; color:#374151; font-size:14px;">
                                  <li style="margin-bottom:6px;">Zoom link & joining instructions will be emailed 24 hours before Day 1</li>
                                  <li style="margin-bottom:6px;">Slack/WhatsApp group invite for doubt support</li>
                                  <li style="margin-bottom:6px;">Prerequisites & lab setup guidance</li>
                                </ul>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0 0 0;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:6px;">
                            <tr>
                              <td style="padding:16px; font-family:Arial,Helvetica,sans-serif;">
                                <div style="font-size:12px; color:#6b7280;">Payment Details</div>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:6px; font-size:14px; color:#111827;">
                                  <tr>
                                    <td width="50%" style="padding:4px 0;">Transaction ID</td>
                                    <td width="50%" style="padding:4px 0; font-family:Consolas,'Courier New',monospace;">${id}</td>
                                  </tr>
                                  <tr>
                                    <td width="50%" style="padding:4px 0;">Amount Paid</td>
                                    <td width="50%" style="padding:4px 0; font-weight:700;">₹${amountInRupees}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:12px; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#374151; line-height:1.6;">
                          <p style="margin:0 0 12px 0;">If you have any questions, reply to this email or contact us at <a href="mailto:info@thedevopscommunity.com" style="color:#0f766e; text-decoration:none;">info@thedevopscommunity.com</a>.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:24px; border-top:1px solid #e5e7eb; font-family:Arial,Helvetica,sans-serif; text-align:center;">
                          <div style="font-size:14px; color:#111827; font-weight:600;">Best regards,<br />The DevOps Community Team</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="background-color:#f8fafc; padding:16px; border-top:1px solid #e5e7eb;">
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#6b7280;">© 2025 The DevOps Community. Empowering careers through hands‑on learning.</div>
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:#6b7280; margin-top:4px;">You received this email because you enrolled in our Docker & Kubernetes bootcamp.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  } as const;

  await transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
  const requestId = crypto.randomBytes(8).toString('hex');
  logEvent('WEBHOOK_RECEIVED', { requestId });

  try {
    const signature = request.headers.get('x-razorpay-signature');
    if (!signature) {
      logEvent('SIGNATURE_MISSING', { requestId });
      return NextResponse.json({ error: 'No signature found' }, { status: 400, headers: corsHeaders });
    }

    const rawBody = await request.text();
    const isValid = verifyWebhookSignature(rawBody, signature, process.env.RAZORPAY_WEBHOOK_SECRET || '');
    if (!isValid) {
      logEvent('SIGNATURE_INVALID', { requestId });
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400, headers: corsHeaders });
    }

    const data = JSON.parse(rawBody) as RazorpayWebhookPayload;
    logEvent('PAYLOAD', { requestId, event: data.event });

    if (data.event !== 'payment.captured' || !data.payload?.payment) {
      logEvent('EVENT_IGNORED', { requestId, event: data.event });
      return NextResponse.json({ message: 'Event acknowledged' }, { status: 200, headers: corsHeaders });
    }

    const payment = data.payload.payment.entity;
    const paymentId = payment.id;

    if (processedPayments.has(paymentId)) {
      logEvent('DUPLICATE_PAYMENT_IGNORED', { requestId, paymentId });
      return NextResponse.json({ message: 'Already processed' }, { status: 200, headers: corsHeaders });
    }

    processedPayments.add(paymentId);

    // Store payment in database
    const customerName = payment.notes?.name || 'Unknown';
    const customerPhone = payment.notes?.phone || payment.contact;
    const promoCode = payment.notes?.promo;

    try {
      await storePaymentInDatabase({
        name: customerName,
        email: payment.email,
        phone: customerPhone,
        amount: payment.amount,
        razorpay_payment_id: payment.id,
        razorpay_order_id: payment.order_id,
        promo_code: promoCode
      });
    } catch (dbError) {
      logEvent('DATABASE_STORE_FAILED', { 
        requestId, 
        paymentId, 
        error: dbError instanceof Error ? dbError.message : 'Unknown error' 
      });
      // Continue with email even if database fails
    }

    // Send confirmation email
    try {
      await sendConfirmationEmail({
        email: payment.email,
        amount: payment.amount,
        id: payment.id,
        name: customerName,
        contact: customerPhone,
      });
    } catch (emailError) {
      logEvent('EMAIL_SEND_FAILED', { 
        requestId, 
        paymentId, 
        error: emailError instanceof Error ? emailError.message : 'Unknown error' 
      });
      // Continue even if email fails
    }

    logEvent('WEBHOOK_SUCCESS', { requestId, paymentId });
    return NextResponse.json({ message: 'Processed' }, { status: 200, headers: corsHeaders });
  } catch (error) {
    logEvent('WEBHOOK_ERROR', { requestId, error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}


