import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

interface RazorpayPaymentEntity {
  id: string;
  amount: number;
  email: string;
  contact?: string;
  notes?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment?: {
      entity: RazorpayPaymentEntity;
    };
  };
}

const processedPayments = new Set<string>();

setInterval(() => {
  processedPayments.clear();
  logEvent('CACHE_CLEANED', { timestamp: new Date().toISOString() });
}, 60 * 60 * 1000);

const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://api.razorpay.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-razorpay-signature',
};

function logEvent(type: string, data: Record<string, unknown>) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [AWS_EKS_WEBHOOK] [${type}]`, JSON.stringify(data, null, 2));
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
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return false;
  }
}

async function sendConfirmationEmail(emailData: {
  email: string;
  amount: number;
  id: string;
  name?: string;
  contact?: string;
}) {
  const { email, amount, id, name } = emailData;
  const amountInRupees = (amount / 100).toFixed(2);
  const firstName = (name || 'Learner').split(' ')[0];

  logEvent('EMAIL_ATTEMPT', {
    to: email,
    name: firstName,
    amount: amountInRupees,
    paymentId: id,
    workshop: 'aws_eks_workshop_2026',
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Confirmed – AWS + Kubernetes + Claude AI Workshop (March 2026)',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AWS EKS Workshop Registration Confirmed</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f3f4f6;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
          <tr>
            <td align="center" style="padding:24px;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border:1px solid #e5e7eb; border-radius:8px;">

                <!-- Header -->
                <tr>
                  <td align="left" style="background-color:#FF9900; padding:24px; color:#ffffff;">
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; text-transform:uppercase; font-weight:bold; letter-spacing:0.5px; opacity:0.9;">Registration Confirmed</div>
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:22px; font-weight:800; line-height:1.25; margin-top:6px; color:#0d1117;">AWS + Kubernetes + Claude AI Workshop</div>
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; margin-top:6px; color:#0d1117; opacity:0.85;">Your seat is confirmed, ${firstName}!</div>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">

                      <!-- Intro -->
                      <tr>
                        <td style="font-family:Arial,Helvetica,sans-serif; font-size:15px; color:#374151; line-height:1.6; padding-bottom:16px;">
                          <p style="margin:0 0 12px 0;">Hi <strong style="color:#111827;">${firstName}</strong>,</p>
                          <p style="margin:0 0 12px 0;">
                            Thank you for registering for the
                            <strong style="color:#FF9900;">AWS + Kubernetes + Claude AI – Your First Production DevOps Project</strong>
                            workshop. Your payment has been received and your seat is locked in.
                          </p>
                          <p style="margin:0;">
                            We're excited to have you build a real production-grade microservices platform on Amazon EKS — live, hands-on, with Claude AI as your co-pilot.
                          </p>
                        </td>
                      </tr>

                      <!-- Workshop Details -->
                      <tr>
                        <td style="padding-bottom:16px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:2px solid #FF9900; border-radius:8px; overflow:hidden;">
                            <tr>
                              <td style="background-color:#FF9900; padding:14px 20px;">
                                <div style="font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#0d1117;">Workshop Details</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:20px; background-color:#fffbf2;">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#374151;">
                                  <tr>
                                    <td style="padding:6px 0; width:40%; color:#6b7280; font-weight:600; text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Dates</td>
                                    <td style="padding:6px 0; font-weight:600; color:#111827;">14th &amp; 15th March 2026</td>
                                  </tr>
                                  <tr>
                                    <td style="padding:6px 0; color:#6b7280; font-weight:600; text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Time</td>
                                    <td style="padding:6px 0; font-weight:600; color:#111827;">7:30 PM – 9:30 PM IST (each day)</td>
                                  </tr>
                                  <tr>
                                    <td style="padding:6px 0; color:#6b7280; font-weight:600; text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Duration</td>
                                    <td style="padding:6px 0; font-weight:600; color:#111827;">6–7 Hours Total (Live, Hands-on)</td>
                                  </tr>
                                  <tr>
                                    <td style="padding:6px 0; color:#6b7280; font-weight:600; text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Mode</td>
                                    <td style="padding:6px 0; font-weight:600; color:#111827;">Live Online</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- What You'll Get -->
                      <tr>
                        <td style="padding-bottom:16px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8fafc; border:1px solid #e5e7eb; border-radius:6px;">
                            <tr>
                              <td style="padding:16px; font-family:Arial,Helvetica,sans-serif;">
                                <div style="font-size:15px; font-weight:700; color:#111827; margin-bottom:10px;">What's Included</div>
                                <ul style="padding-left:20px; margin:0; color:#374151; font-size:14px; line-height:1.8;">
                                  <li>2 live sessions (2 hours each) on 14th &amp; 15th March 2026</li>
                                  <li>Full project source code — microservices blog platform</li>
                                  <li>Session recordings — rewatch at your own pace, forever</li>
                                  <li>Claude AI workflow setup guide for VS Code</li>
                                  <li>Step-by-step guidance so no one gets left behind</li>
                                  <li>Live Q&amp;A and doubt resolution during both sessions</li>
                                </ul>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- What's Next -->
                      <tr>
                        <td style="padding-bottom:16px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8fafc; border:1px solid #e5e7eb; border-radius:6px;">
                            <tr>
                              <td style="padding:16px; font-family:Arial,Helvetica,sans-serif;">
                                <div style="font-size:15px; font-weight:700; color:#111827; margin-bottom:10px;">What's Next</div>
                                <div style="font-size:14px; color:#374151; margin-bottom:8px;">Our team will reach out shortly with:</div>
                                <ul style="padding-left:20px; margin:0; color:#374151; font-size:14px; line-height:1.8;">
                                  <li>Zoom / meeting link for both sessions</li>
                                  <li>Pre-workshop setup checklist (AWS CLI, eksctl, kubectl)</li>
                                  <li>Access to the GitHub repository and workshop materials</li>
                                  <li>Support contact in case you need any help before we start</li>
                                </ul>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Payment Details -->
                      <tr>
                        <td style="padding-bottom:16px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:6px;">
                            <tr>
                              <td style="padding:16px; font-family:Arial,Helvetica,sans-serif;">
                                <div style="font-size:12px; color:#6b7280; margin-bottom:8px;">Payment Details</div>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:14px; color:#111827;">
                                  <tr>
                                    <td width="50%" style="padding:4px 0;">Transaction ID</td>
                                    <td width="50%" style="padding:4px 0; font-family:Consolas,'Courier New',monospace; font-size:13px;">${id}</td>
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

                      <!-- Closing message -->
                      <tr>
                        <td style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#374151; line-height:1.6; padding-bottom:20px;">
                          <p style="margin:0 0 10px 0;">
                            If you have any questions before the workshop, reply to this email or contact us at
                            <a href="mailto:frontdesk@thedevopscommunity.com" style="color:#FF9900; text-decoration:none;">frontdesk@thedevopscommunity.com</a>.
                          </p>
                          <p style="margin:0;">See you on 7th March!</p>
                        </td>
                      </tr>

                      <!-- Sign-off -->
                      <tr>
                        <td style="padding-top:16px; border-top:1px solid #e5e7eb; font-family:Arial,Helvetica,sans-serif; text-align:center;">
                          <div style="font-size:14px; color:#111827; font-weight:600;">Best regards,<br />The DevOps Community Team</div>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="background-color:#f8fafc; padding:16px; border-top:1px solid #e5e7eb;">
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#6b7280;">© 2026 The DevOps Community. Empowering careers through hands-on learning.</div>
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:#6b7280; margin-top:4px;">This email was sent because you registered for the AWS EKS Workshop.</div>
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
  logEvent('EMAIL_SENT', { to: email, paymentId: id });
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
    const isValid = verifyWebhookSignature(
      rawBody,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET || ''
    );

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

    await sendConfirmationEmail({
      email: payment.email,
      amount: payment.amount,
      id: payment.id,
      name: payment.notes?.name,
      contact: payment.contact,
    });

    logEvent('WEBHOOK_SUCCESS', { requestId, paymentId });
    return NextResponse.json({ message: 'Processed' }, { status: 200, headers: corsHeaders });
  } catch (error) {
    logEvent('WEBHOOK_ERROR', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
