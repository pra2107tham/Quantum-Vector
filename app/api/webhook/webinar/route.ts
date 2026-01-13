import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Types for webhook payload
interface RazorpayPaymentEntity {
  id: string;
  amount: number;
  email: string;
  contact?: string;
  payment_page?: string;
  notes?: {
    name?: string;
    email?: string;
    phone?: string;
    label?: string;
  };
}

interface RazorpayPaymentLinkEntity {
  id: string;
  amount: number;
  customer: {
    email: string;
    contact: string;
    name?: string;
  };
}

interface RazorpayInvoiceEntity {
  id: string;
  amount: number;
  customer_details: {
    id: string;
    name: string;
    email: string;
    contact: string;
    customer_name: string;
    customer_email: string;
    customer_contact: string;
  };
}

interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment?: {
      entity: RazorpayPaymentEntity;
    };
    payment_link?: {
      entity: RazorpayPaymentLinkEntity;
    };
    order?: {
      entity: {
        id: string;
        amount: number;
      };
    };
    invoice?: {
      entity: RazorpayInvoiceEntity;
    };
  };
}

// Routing now handled strictly via notes.label in webhook payload

// In-memory cache to prevent duplicate processing (in production, use Redis)
const processedPayments = new Set<string>();

// Clean up cache every hour
setInterval(() => {
  processedPayments.clear();
  logEvent('CACHE_CLEANED', { timestamp: new Date().toISOString() });
}, 60 * 60 * 1000);

// Initialize nodemailer transporter
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

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://api.razorpay.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-razorpay-signature',
};

// Logger function
function logEvent(type: string, data: Record<string, unknown>) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}]`, JSON.stringify(data, null, 2));
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  logEvent('CORS_PREFLIGHT', { method: 'OPTIONS' });
  return NextResponse.json({}, { headers: corsHeaders });
}

// Verify webhook signature using HMAC SHA256
function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');
    
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    );

    logEvent('SIGNATURE_VERIFICATION', {
      isValid,
      expectedSignature,
      receivedSignature: signature
    });

    return isValid;
  } catch (error) {
    logEvent('SIGNATURE_VERIFICATION_ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
}

// Send confirmation email for DevOps Roadmap 2026 webinar
async function sendRoadmapWebinarEmail(emailData: { email: string; amount: number; id: string; name?: string; contact?: string }) {
  const { email, amount, id, name } = emailData;
  const amountInRupees = (amount / 100).toFixed(2);
  const userName = name || 'Student';

  logEvent('EMAIL_ATTEMPT', {
    to: email,
    name: userName,
    contact: emailData.contact || 'Not provided',
    amount: amountInRupees,
    paymentId: id,
    webinar: 'devops_roadmap_2026'
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Confirmed - DevOps Roadmap 2026 Webinar',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8f9fa;">
        
        <!-- Main Container -->
        <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e9ecef;">

          <!-- Content Container -->
          <div style="padding: 32px;">
            
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">Hi${userName !== 'Student' ? ` ${userName}` : ''},</p>
            
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Thank you for registering for the <strong>DevOps Roadmap 2026 – Complete Career Guide</strong> webinar.
            </p>
            
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              We're excited to have you join us.
            </p>

            <!-- Webinar Details -->
            <div style="margin-bottom: 32px; border: 2px solid #2563eb; border-radius: 10px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 20px; border-bottom: 1px solid #1e40af;">
                <h3 style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0;">📅 Webinar Details</h3>
            </div>

              <div style="background-color: #ffffff; padding: 24px;">
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Date</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">28th December 2025</div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Time</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">9:00 – 10:30 AM (IST)</div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Mode</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">Live Online</div>
                </div>
                <div>
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">One-Time Fee</div>
                  <div style="color: #198754; font-size: 18px; font-weight: 700;">₹${amountInRupees}</div>
                </div>
              </div>
            </div>

            <!-- What You'll Learn -->
            <div style="margin-bottom: 32px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">🔍 What You'll Learn</h3>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                This session is designed to give you <strong>absolute clarity</strong> on your DevOps career in 2026:
              </p>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;">What to study (skills, tools, real expectations)</li>
                <li style="margin-bottom: 8px;">How to study (right order, projects, practice)</li>
                <li style="margin-bottom: 8px;">How DevOps hiring works in 2026</li>
                <li style="margin-bottom: 8px;">What companies actually expect from DevOps engineers</li>
                <li style="margin-bottom: 8px;">Common mistakes learners make—and how to avoid them</li>
              </ul>
            </div>

            <!-- Who We Are -->
            <div style="margin-bottom: 32px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">👥 Who We Are – QuantumVector by DevOps Community</h3>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                <strong>QuantumVector (quantumvector.sh)</strong> is <strong>not a consultancy</strong>.
              </p>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                We are a <strong>community-driven initiative led by 10–15 experienced DevOps engineers</strong> who actively work on <strong>real production systems</strong> across cloud, Kubernetes, CI/CD, monitoring, and automation.
              </p>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 12px 0; font-weight: 600;">Everything we teach is based on:</p>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;">Real production incidents</li>
                <li style="margin-bottom: 8px;">Live systems</li>
                <li style="margin-bottom: 8px;">Actual workflows used in companies today</li>
              </ul>
            </div>

            <!-- WhatsApp Group -->
            <div style="margin-bottom: 32px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #0ea5e9; border-radius: 8px; padding: 24px;">
              <h3 style="color: #0c4a6e; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;">📲 Important: Join the WhatsApp Group</h3>
              <p style="color: #0369a1; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                All webinar updates, joining links, and materials will be shared via our <strong>official WhatsApp group</strong>.
              </p>
              <p style="color: #0369a1; font-size: 15px; line-height: 1.6; margin: 0 0 12px 0;">
                👉 <strong>Join the DevOps Roadmap 2026 WhatsApp Group:</strong>
              </p>
              <div style="text-align: center; margin: 16px 0;">
                <a href="https://chat.whatsapp.com/C0I21LEw5NVKNzdEBCEOGA" style="display: inline-block; background: #25D366; color: #ffffff; font-size: 16px; font-weight: 600; padding: 14px 28px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3); transition: all 0.3s ease;">
                  Join WhatsApp Group
                </a>
              </div>
              <p style="color: #0369a1; font-size: 14px; line-height: 1.6; margin: 12px 0 0 0; text-align: center;">
                <a href="https://chat.whatsapp.com/C0I21LEw5NVKNzdEBCEOGA" style="color: #0369a1; text-decoration: underline;">https://chat.whatsapp.com/C0I21LEw5NVKNzdEBCEOGA</a>
              </p>
              </div>
              
            <!-- Want to Go Deeper -->
            <div style="margin-bottom: 32px; border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">🚀 Want to Go Deeper?</h3>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                We also offer <strong>Offline & Online DevOps Courses</strong> focused on:
              </p>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0 0 16px 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;">Hands-on production-level learning</li>
                <li style="margin-bottom: 8px;">Real projects, not demos</li>
                <li style="margin-bottom: 8px;">Career guidance and mentorship</li>
              </ul>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0;">
                For complete details, visit:<br/>
                👉 <a href="https://quantumvector.sh" style="color: #2563eb; text-decoration: none; font-weight: 600;">https://quantumvector.sh</a>
              </p>
                  </div>

            <!-- Closing -->
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              Looking forward to seeing you in the live session.
            </p>

            <!-- Signature -->
            <div style="border-top: 1px solid #e9ecef; padding-top: 24px;">
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
                Warm regards,<br/>
                <strong>Team DevOps Community</strong><br/>
                <strong>QuantumVector</strong>
              </p>
              <p style="color: #6c757d; font-size: 14px; margin: 8px 0 0 0;">
                🌐 <a href="https://quantumvector.sh" style="color: #2563eb; text-decoration: none;">https://quantumvector.sh</a>
              </p>
                  </div>

            <!-- Transaction ID -->
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e9ecef;">
              <div style="color: #6c757d; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 4px;">Transaction ID</div>
              <div style="color: #212529; font-size: 13px; font-weight: 600; font-family: 'SF Mono', Monaco, monospace; background-color: #f8f9fa; padding: 8px 12px; border-radius: 4px; border: 1px solid #dee2e6;">${id}</div>
                  </div>
                </div>
                
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; font-size: 12px; margin: 0;">This is an automated confirmation email.</p>
                </div>
              </div>
            </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logEvent('EMAIL_SUCCESS', {
      to: email,
      name: userName,
      paymentId: id,
      timestamp: new Date().toISOString(),
      webinar: 'devops_roadmap_2026'
    });
  } catch (error) {
    logEvent('EMAIL_ERROR', {
      to: email,
      name: userName,
      paymentId: id,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      webinar: 'devops_roadmap_2026'
    });
    throw error;
  }
}

// Send confirmation email for Python for DevOps 2026 Webinar
async function sendPythonDevOpsWebinarEmail(emailData: { email: string; amount: number; id: string; name?: string; contact?: string }) {
  const { email, amount, id, name } = emailData;
  const amountInRupees = (amount / 100).toFixed(2);
  const userName = name || 'Student';

  logEvent('EMAIL_ATTEMPT', {
    to: email,
    name: userName,
    contact: emailData.contact || 'Not provided',
    amount: amountInRupees,
    paymentId: id,
    webinar: 'python_for_devops_2026'
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Confirmed - Python for DevOps 2026 Webinar',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8f9fa;">
        
        <!-- Main Container -->
        <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e9ecef;">

          <!-- Content Container -->
          <div style="padding: 32px;">
            
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">Hi${userName !== 'Student' ? ` ${userName}` : ''},</p>
            
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Thank you for registering for the <strong>Python for DevOps 2026 – Live Weekend Webinar</strong>.
            </p>
            
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              We're excited to have you join us for this hands-on, beginner-to-intermediate live program focused on real DevOps automation with Python.
            </p>

            <!-- Webinar Details -->
            <div style="margin-bottom: 32px; border: 2px solid #2563eb; border-radius: 10px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 20px; border-bottom: 1px solid #1e40af;">
                <h3 style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0;">📅 Webinar Details</h3>
            </div>

              <div style="background-color: #ffffff; padding: 24px;">
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Dates</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">10, 11, 17, 18 (Two Weekends)</div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Time</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">6:00 PM – 9:00 PM (IST)</div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Duration</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">10+ Hours (Live, Hands-on)</div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Mode</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">Live Online</div>
                </div>
                <div>
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">One-Time Fee</div>
                  <div style="color: #198754; font-size: 18px; font-weight: 700;">₹${amountInRupees}</div>
                </div>
              </div>
            </div>

            <!-- What You'll Learn -->
            <div style="margin-bottom: 32px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">🔍 What You'll Learn</h3>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                This webinar focuses on practical DevOps use cases, automation scripts, and industry-relevant workflows used in real production environments:
              </p>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;">Python fundamentals tailored for DevOps engineers</li>
                <li style="margin-bottom: 8px;">Environment variables, .env files, and CLI-based scripts</li>
                <li style="margin-bottom: 8px;">Automating tasks using loops, lists, dictionaries, and sets</li>
                <li style="margin-bottom: 8px;">File operations for configuration and server management</li>
                <li style="margin-bottom: 8px;">Log parsing and system data processing scripts</li>
                <li style="margin-bottom: 8px;">Remote automation using Fabric</li>
                <li style="margin-bottom: 8px;">AWS automation using Boto3 (EC2, S3, basic cloud tasks)</li>
              </ul>
            </div>

            <!-- Hands-on Projects -->
            <div style="margin-bottom: 32px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">🚀 Hands-on Projects (Included)</h3>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;"><strong>Project 1:</strong> Manage and optimize server configurations using Python dictionaries</li>
                <li style="margin-bottom: 8px;"><strong>Project 2:</strong> Automate file and configuration updates based on external triggers</li>
                <li style="margin-bottom: 8px;"><strong>Project 3:</strong> AWS automation script to deploy or manage cloud resources</li>
              </ul>
              <p style="color: #212529; font-size: 14px; line-height: 1.6; margin: 12px 0 0 0; font-style: italic;">
                All projects are DevOps-oriented, not generic Python exercises.
              </p>
            </div>

            <!-- Who We Are -->
            <div style="margin-bottom: 32px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">👥 Who We Are – QuantumVector by DevOps Community</h3>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                <strong>QuantumVector (quantumvector.sh)</strong> is <strong>not a consultancy</strong>.
              </p>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                We are a <strong>community-driven initiative led by 10–15 experienced DevOps engineers</strong> who actively work on <strong>real production systems</strong> across cloud, Kubernetes, CI/CD, monitoring, and automation.
              </p>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 12px 0; font-weight: 600;">Everything we teach is based on:</p>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;">Real production incidents</li>
                <li style="margin-bottom: 8px;">Live systems</li>
                <li style="margin-bottom: 8px;">Actual workflows used in companies today</li>
              </ul>
            </div>

            <!-- WhatsApp Group -->
            <div style="margin-bottom: 32px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #0ea5e9; border-radius: 8px; padding: 24px;">
              <h3 style="color: #0c4a6e; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;">📲 Important: Join the WhatsApp Group</h3>
              <p style="color: #0369a1; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                All webinar updates, joining links, and materials will be shared via our <strong>official WhatsApp group</strong>.
              </p>
              <p style="color: #0369a1; font-size: 15px; line-height: 1.6; margin: 0 0 12px 0;">
                👉 <strong>Join the Python for DevOps 2026 WhatsApp Group:</strong>
              </p>
              <div style="text-align: center; margin: 16px 0;">
                <a href="https://chat.whatsapp.com/C0I21LEw5NVKNzdEBCEOGA" style="display: inline-block; background: #25D366; color: #ffffff; font-size: 16px; font-weight: 600; padding: 14px 28px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3); transition: all 0.3s ease;">
                  Join WhatsApp Group
                </a>
              </div>
              <p style="color: #0369a1; font-size: 14px; line-height: 1.6; margin: 12px 0 0 0; text-align: center;">
                <a href="https://chat.whatsapp.com/C0I21LEw5NVKNzdEBCEOGA" style="color: #0369a1; text-decoration: underline;">https://chat.whatsapp.com/C0I21LEw5NVKNzdEBCEOGA</a>
              </p>
              </div>
              
            <!-- Want to Go Deeper -->
            <div style="margin-bottom: 32px; border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">🚀 Want to Go Deeper?</h3>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                We also offer <strong>Offline & Online DevOps Courses</strong> focused on:
              </p>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0 0 16px 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;">Hands-on production-level learning</li>
                <li style="margin-bottom: 8px;">Real projects, not demos</li>
                <li style="margin-bottom: 8px;">Career guidance and mentorship</li>
              </ul>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0;">
                For complete details, visit:<br/>
                👉 <a href="https://quantumvector.sh" style="color: #2563eb; text-decoration: none; font-weight: 600;">https://quantumvector.sh</a>
              </p>
                  </div>

            <!-- Closing -->
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              Looking forward to seeing you in the live sessions.
            </p>

            <!-- Signature -->
            <div style="border-top: 1px solid #e9ecef; padding-top: 24px;">
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
                Warm regards,<br/>
                <strong>Team DevOps Community</strong><br/>
                <strong>QuantumVector</strong>
              </p>
              <p style="color: #6c757d; font-size: 14px; margin: 8px 0 0 0;">
                🌐 <a href="https://quantumvector.sh" style="color: #2563eb; text-decoration: none;">https://quantumvector.sh</a>
              </p>
                  </div>

            <!-- Transaction ID -->
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e9ecef;">
              <div style="color: #6c757d; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 4px;">Transaction ID</div>
              <div style="color: #212529; font-size: 13px; font-weight: 600; font-family: 'SF Mono', Monaco, monospace; background-color: #f8f9fa; padding: 8px 12px; border-radius: 4px; border: 1px solid #dee2e6;">${id}</div>
                  </div>
                </div>
                
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; font-size: 12px; margin: 0;">This is an automated confirmation email.</p>
                </div>
              </div>
            </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logEvent('EMAIL_SUCCESS', {
      to: email,
      name: userName,
      paymentId: id,
      timestamp: new Date().toISOString(),
      webinar: 'python_for_devops_2026'
    });
  } catch (error) {
    logEvent('EMAIL_ERROR', {
      to: email,
      name: userName,
      paymentId: id,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      webinar: 'python_for_devops_2026'
    });
    throw error;
  }
}

// Send confirmation email for AWS DevOps Course
async function sendAWSCourseEmail(emailData: { email: string; amount: number; id: string; name?: string; contact?: string }) {
  const { email, amount, id, name } = emailData;
  const amountInRupees = (amount / 100).toFixed(2);
  const userName = name || 'Student';

  logEvent('EMAIL_ATTEMPT', {
    to: email,
    name: userName,
    contact: emailData.contact || 'Not provided',
    amount: amountInRupees,
    paymentId: id,
    course: 'aws_devops'
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Confirmed - AWS DevOps Course',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8f9fa;">
        
        <!-- Main Container -->
        <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e9ecef;">
          
          <!-- Content Container -->
          <div style="padding: 32px;">
            
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">Hi${userName !== 'Student' ? ` ${userName}` : ''},</p>
            
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Thank you for registering for the <strong>AWS DevOps Course</strong>.
            </p>
            
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              We've received your registration successfully.
            </p>

            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              For the next steps and further process, <strong>our team will contact you shortly</strong> with all the required details.
            </p>

            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              If you have any questions in the meantime, you can contact us at <strong>8527144657</strong>.
            </p>

            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              Looking forward to connecting with you.
            </p>

            <!-- Signature -->
            <div style="border-top: 1px solid #e9ecef; padding-top: 24px;">
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
                Best regards,<br/>
                <strong>Team DevOps Community</strong><br/>
                <strong>QuantumVector</strong>
              </p>
            </div>

            <!-- Transaction ID -->
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e9ecef;">
              <div style="color: #6c757d; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 4px;">Transaction ID</div>
              <div style="color: #212529; font-size: 13px; font-weight: 600; font-family: 'SF Mono', Monaco, monospace; background-color: #f8f9fa; padding: 8px 12px; border-radius: 4px; border: 1px solid #dee2e6;">${id}</div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; font-size: 12px; margin: 0;">This is an automated confirmation email.</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logEvent('EMAIL_SUCCESS', {
      to: email,
      name: userName,
      paymentId: id,
      timestamp: new Date().toISOString(),
      course: 'aws_devops'
    });
  } catch (error) {
    logEvent('EMAIL_ERROR', {
      to: email,
      name: userName,
      paymentId: id,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      course: 'aws_devops'
    });
    throw error;
  }
}

// Send confirmation email for Docker & Kubernetes 2026 Webinar
async function sendDockerKubernetesWebinarEmail(emailData: { email: string; amount: number; id: string; name?: string; contact?: string }) {
  const { email, amount, id, name } = emailData;
  const amountInRupees = (amount / 100).toFixed(2);
  const userName = name || 'Student';

  logEvent('EMAIL_ATTEMPT', {
    to: email,
    name: userName,
    contact: emailData.contact || 'Not provided',
    amount: amountInRupees,
    paymentId: id,
    webinar: 'docker_kubernetes_2026'
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Confirmed - Docker & Kubernetes Webinar January 2026',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8f9fa;">

        <!-- Main Container -->
        <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e9ecef;">

          <!-- Content Container -->
          <div style="padding: 32px;">

            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">Hi${userName !== 'Student' ? ` ${userName}` : ''},</p>

            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Thank you for registering for the <strong>Docker & Kubernetes Webinar – Live Weekend Program</strong>.
            </p>

            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              We're excited to have you join us for this comprehensive hands-on program focused on containerization and Kubernetes orchestration with a real-time e-commerce microservices project.
            </p>

            <!-- Webinar Details -->
            <div style="margin-bottom: 32px; border: 2px solid #2563eb; border-radius: 10px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 20px; border-bottom: 1px solid #1e40af;">
                <h3 style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0;">📅 Webinar Details</h3>
            </div>

              <div style="background-color: #ffffff; padding: 24px;">
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Dates</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">24, 25, 31 Jan & 1 Feb 2026 (Weekends Only)</div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Time</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">8:00 AM – 10:30 AM (IST)</div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Duration</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">10+ Hours (Live, Hands-on)</div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Mode</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">Live Online</div>
                </div>
                <div>
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">One-Time Fee</div>
                  <div style="color: #198754; font-size: 18px; font-weight: 700;">₹${amountInRupees}</div>
                </div>
              </div>
            </div>

            <!-- Real-Time Project -->
            <div style="margin-bottom: 32px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #0ea5e9; border-radius: 8px; padding: 24px;">
              <h3 style="color: #0c4a6e; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;">🛒 Real-Time E-Commerce Microservices Project</h3>
              <p style="color: #0369a1; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                Build a complete e-commerce application using microservice architecture throughout the webinar. This isn't a pre-built demo—we'll develop it <strong>live</strong>, showing you real production-grade containerization and orchestration patterns.
              </p>
              <p style="color: #0369a1; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">Microservices We'll Build:</p>
              <ul style="color: #0369a1; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;"><strong>User Login Service</strong> - Authentication and session management</li>
                <li style="margin-bottom: 8px;"><strong>Shopping Cart Service</strong> - Real-time cart operations with state management</li>
                <li style="margin-bottom: 8px;"><strong>Product Inventory Service</strong> - Product catalog with database integration</li>
                <li style="margin-bottom: 8px;"><strong>Payment Service</strong> - Secure payment processing microservice</li>
              </ul>
            </div>

            <!-- What You'll Learn -->
            <div style="margin-bottom: 32px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">📚 Webinar Modules</h3>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                This webinar covers Kubernetes from basics to advanced production-ready concepts:
              </p>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;">Kubernetes architecture, cluster setup, and kubectl commands</li>
                <li style="margin-bottom: 8px;">PODs, ReplicaSets, Deployments with Rolling Update strategies</li>
                <li style="margin-bottom: 8px;">DaemonSets, StatefulSets for stateful applications</li>
                <li style="margin-bottom: 8px;">PersistentVolumes, PersistentVolumeClaims, ConfigMaps & Secrets</li>
                <li style="margin-bottom: 8px;">Kubernetes Services: ClusterIP, NodePort, LoadBalancer</li>
                <li style="margin-bottom: 8px;">Ingress Controller setup for HTTP/HTTPS routing</li>
                <li style="margin-bottom: 8px;">Liveness and Readiness Probes for health monitoring</li>
                <li style="margin-bottom: 8px;">Horizontal Pod Autoscaler (HPA) with Metrics Server</li>
                <li style="margin-bottom: 8px;">Node maintenance: Cordon, Drain, Uncordon operations</li>
                <li style="margin-bottom: 8px;">Scheduling with Taints, Tolerations, Affinity & Anti-Affinity</li>
                <li style="margin-bottom: 8px;">Kubernetes RBAC: Roles, RoleBindings, ServiceAccounts</li>
                <li style="margin-bottom: 8px;">Production-ready microservices deployment patterns</li>
              </ul>
            </div>

            <!-- What You'll Get -->
            <div style="margin-bottom: 32px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">🎁 What You'll Get</h3>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;">10+ hours of live, hands-on weekend sessions</li>
                <li style="margin-bottom: 8px;">Real e-commerce microservices project with complete source code</li>
                <li style="margin-bottom: 8px;">Docker scripts and Kubernetes manifests for all services</li>
                <li style="margin-bottom: 8px;">Production-ready patterns for health checks, scaling, and RBAC</li>
                <li style="margin-bottom: 8px;">Lifetime access to session recordings and materials</li>
              </ul>
            </div>

            <!-- Who We Are -->
            <div style="margin-bottom: 32px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">👥 Who We Are – QuantumVector by DevOps Community</h3>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                <strong>QuantumVector (quantumvector.sh)</strong> is <strong>not a consultancy</strong>.
              </p>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                We are a <strong>community-driven initiative led by 10–15 experienced DevOps engineers</strong> who actively work on <strong>real production systems</strong> across cloud, Kubernetes, CI/CD, monitoring, and automation.
              </p>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 12px 0; font-weight: 600;">Everything we teach is based on:</p>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;">Real production incidents</li>
                <li style="margin-bottom: 8px;">Live systems</li>
                <li style="margin-bottom: 8px;">Actual workflows used in companies today</li>
              </ul>
            </div>

            <!-- Next Steps -->
            <div style="margin-bottom: 32px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 8px; padding: 24px;">
              <h3 style="color: #78350f; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;">📞 Next Steps</h3>
              <p style="color: #92400e; font-size: 15px; line-height: 1.6; margin: 0;">
                <strong>Our team will contact you shortly</strong> with the WhatsApp group link, joining details, and all required materials for the webinar.
              </p>
            </div>

            <!-- Want to Go Deeper -->
            <div style="margin-bottom: 32px; border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">🚀 Want to Go Deeper?</h3>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                We also offer <strong>Offline & Online DevOps Courses</strong> focused on:
              </p>
              <ul style="color: #212529; font-size: 15px; line-height: 1.8; margin: 0 0 16px 0; padding-left: 24px;">
                <li style="margin-bottom: 8px;">Hands-on production-level learning</li>
                <li style="margin-bottom: 8px;">Real projects, not demos</li>
                <li style="margin-bottom: 8px;">Career guidance and mentorship</li>
              </ul>
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0;">
                For complete details, visit:<br/>
                👉 <a href="https://quantumvector.sh" style="color: #2563eb; text-decoration: none; font-weight: 600;">https://quantumvector.sh</a>
              </p>
                  </div>

            <!-- Closing -->
            <p style="color: #212529; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              Looking forward to seeing you in the live sessions.
            </p>

            <!-- Signature -->
            <div style="border-top: 1px solid #e9ecef; padding-top: 24px;">
              <p style="color: #212529; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
                Warm regards,<br/>
                <strong>Team DevOps Community</strong><br/>
                <strong>QuantumVector</strong>
              </p>
              <p style="color: #6c757d; font-size: 14px; margin: 8px 0 0 0;">
                🌐 <a href="https://quantumvector.sh" style="color: #2563eb; text-decoration: none;">https://quantumvector.sh</a>
              </p>
                  </div>

            <!-- Transaction ID -->
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e9ecef;">
              <div style="color: #6c757d; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 4px;">Transaction ID</div>
              <div style="color: #212529; font-size: 13px; font-weight: 600; font-family: 'SF Mono', Monaco, monospace; background-color: #f8f9fa; padding: 8px 12px; border-radius: 4px; border: 1px solid #dee2e6;">${id}</div>
                  </div>
                </div>

          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; font-size: 12px; margin: 0;">This is an automated confirmation email.</p>
                </div>
              </div>
            </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logEvent('EMAIL_SUCCESS', {
      to: email,
      name: userName,
      paymentId: id,
      timestamp: new Date().toISOString(),
      webinar: 'docker_kubernetes_2026'
    });
  } catch (error) {
    logEvent('EMAIL_ERROR', {
      to: email,
      name: userName,
      paymentId: id,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      webinar: 'docker_kubernetes_2026'
    });
    throw error;
  }
}

export async function POST(request: Request) {
  const requestId = crypto.randomBytes(8).toString('hex');
  logEvent('WEBHOOK_RECEIVED', { requestId });

  try {
    // Get the webhook signature from headers
    const signature = request.headers.get('x-razorpay-signature');
    if (!signature) {
      logEvent('SIGNATURE_MISSING', { requestId });
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Get the raw body as string - DO NOT PARSE IT YET
    const rawBody = await request.text();
    
    // Verify webhook signature using raw body
    const isValid = verifyWebhookSignature(
      rawBody,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET || ''
    );

    if (!isValid) {
      logEvent('SIGNATURE_INVALID', { 
        requestId,
        receivedSignature: signature 
      });
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Only parse the body after signature verification
    const data = JSON.parse(rawBody) as RazorpayWebhookPayload;
    
    // Log complete webhook payload for debugging
    logEvent('COMPLETE_WEBHOOK_PAYLOAD', {
      requestId,
      event: data.event,
      fullPayload: data,
      payloadKeys: Object.keys(data.payload || {}),
      timestamp: new Date().toISOString()
    });
    
    // Log ALL events that come through - this will help us see the pattern
    logEvent('ALL_WEBHOOK_EVENTS', {
      requestId,
      event: data.event,
      hasPayment: !!data.payload?.payment,
      hasPaymentLink: !!data.payload?.payment_link,
      hasOrder: !!data.payload?.order,
      hasInvoice: !!data.payload?.invoice,
      paymentId: data.payload?.payment?.entity?.id,
      paymentLinkId: data.payload?.payment_link?.entity?.id,
      orderId: data.payload?.order?.entity?.id,
      invoiceId: data.payload?.invoice?.entity?.id,
      timestamp: new Date().toISOString()
    });

    // Log invoice.paid events with detailed information
    if (data.event === 'invoice.paid' && data.payload.invoice) {
      logEvent('INVOICE_PAID_DETAILED', {
        requestId,
        event: data.event,
        invoiceData: data.payload.invoice.entity,
        customerDetails: data.payload.invoice.entity.customer_details,
        paymentData: data.payload.payment?.entity,
        availableInvoiceFields: Object.keys(data.payload.invoice.entity || {}),
        availableCustomerFields: Object.keys(data.payload.invoice.entity.customer_details || {}),
        timestamp: new Date().toISOString()
      });
    }
    
    // ONLY process payment.captured events - ignore all others
    if (data.event !== 'payment.captured') {
      logEvent('EVENT_IGNORED', {
        requestId,
        event: data.event,
        reason: 'Only payment.captured events are processed',
        timestamp: new Date().toISOString()
      });
      return NextResponse.json(
        { message: 'Event acknowledged but not processed' },
        { status: 200, headers: corsHeaders }
      );
    }

    // Check if payment data exists
    if (!data.payload.payment) {
      logEvent('PAYMENT_MISSING', {
        requestId,
        event: data.event,
        timestamp: new Date().toISOString()
      });
      return NextResponse.json(
        { error: 'Payment data missing' },
        { status: 400, headers: corsHeaders }
      );
    }

    const payment = data.payload.payment.entity;
    const paymentId = payment.id;
    
    // Check for duplicates using payment ID
    if (processedPayments.has(paymentId)) {
      logEvent('DUPLICATE_PAYMENT_IGNORED', {
        requestId,
        paymentId,
        timestamp: new Date().toISOString()
      });
      return NextResponse.json(
        { message: 'Payment already processed' },
        { status: 200, headers: corsHeaders }
      );
    }

    // Mark as processed immediately to prevent race conditions
    processedPayments.add(paymentId);

    // Extract label for routing
    const label: string | undefined = data?.payload?.payment?.entity?.notes?.label;

    // Log payment details
    logEvent('PAYMENT_DETAILED', {
      requestId,
      fullPaymentData: data.payload.payment,
      paymentEntity: payment,
      availablePaymentFields: Object.keys(payment || {}),
      availableNotesFields: Object.keys(payment.notes || {}),
      label: label ?? null,
      timestamp: new Date().toISOString()
    });
    
    logEvent('PAYMENT_CAPTURED', {
      requestId,
      paymentId: payment.id,
      amount: payment.amount,
      email: payment.email,
      contact: payment.contact || 'Not provided',
      notes: payment.notes,
      label: label ?? null
    });
    // Label-based routing map aligned with actual products
    const routingMap: Record<string, (req?: Request) => Promise<Response>> = {
      // Courses
      aws_course: async (req?: Request) => {
        const { POST } = await import('../courses/aws-devops/route');
        return POST(req as Request);
      },
      // AWS DevOps Course (inline email send)
      aws_devops_course: async () => {
        try {
          await sendAWSCourseEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          logEvent('WEBHOOK_SUCCESS', { requestId, paymentId: payment.id, emailSent: true, handler: 'aws_devops_course' });
          return NextResponse.json({ message: 'AWS DevOps course payment processed and email sent successfully' }, { status: 200, headers: corsHeaders });
        } catch (emailError) {
          logEvent('EMAIL_SEND_FAILED', { requestId, paymentId: payment.id, handler: 'aws_devops_course', error: emailError instanceof Error ? emailError.message : 'Unknown error' });
          return NextResponse.json({ message: 'AWS DevOps course payment processed but email failed' }, { status: 200, headers: corsHeaders });
        }
      },
      azure_course: async (req?: Request) => {
        const { POST } = await import('../courses/azure-devops/route');
        return POST(req as Request);
      },
      // Docker & Kubernetes Bootcamp
      docker_kubernetes: async (req?: Request) => {
        const { POST } = await import('../courses/docker-kubernetes/route');
        return POST(req as Request);
      },
      docker_kubernetes_bootcamp: async (req?: Request) => {
        const { POST } = await import('../courses/docker-kubernetes/route');
        return POST(req as Request);
      },
      // DevOps Roadmap 2026 Webinar (inline email send)
      roadmap_webinar: async () => {
        try {
          await sendRoadmapWebinarEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          logEvent('WEBHOOK_SUCCESS', { requestId, paymentId: payment.id, emailSent: true, handler: 'roadmap_webinar' });
          return NextResponse.json({ message: 'DevOps Roadmap 2026 webinar payment processed and email sent successfully' }, { status: 200, headers: corsHeaders });
        } catch (emailError) {
          logEvent('EMAIL_SEND_FAILED', { requestId, paymentId: payment.id, handler: 'roadmap_webinar', error: emailError instanceof Error ? emailError.message : 'Unknown error' });
          return NextResponse.json({ message: 'DevOps Roadmap 2026 webinar payment processed but email failed' }, { status: 200, headers: corsHeaders });
        }
      },
      // Alternative label for compatibility
      devops_roadmap_2026: async () => {
        try {
          await sendRoadmapWebinarEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          logEvent('WEBHOOK_SUCCESS', { requestId, paymentId: payment.id, emailSent: true, handler: 'devops_roadmap_2026' });
          return NextResponse.json({ message: 'DevOps Roadmap 2026 webinar payment processed and email sent successfully' }, { status: 200, headers: corsHeaders });
        } catch (emailError) {
          logEvent('EMAIL_SEND_FAILED', { requestId, paymentId: payment.id, handler: 'devops_roadmap_2026', error: emailError instanceof Error ? emailError.message : 'Unknown error' });
          return NextResponse.json({ message: 'DevOps Roadmap 2026 webinar payment processed but email failed' }, { status: 200, headers: corsHeaders });
        }
      },
      // Python for DevOps 2026 Webinar (inline email send)
      python_for_devops_2026: async () => {
        try {
          await sendPythonDevOpsWebinarEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          logEvent('WEBHOOK_SUCCESS', { requestId, paymentId: payment.id, emailSent: true, handler: 'python_for_devops_2026' });
          return NextResponse.json({ message: 'Python for DevOps 2026 webinar payment processed and email sent successfully' }, { status: 200, headers: corsHeaders });
        } catch (emailError) {
          logEvent('EMAIL_SEND_FAILED', { requestId, paymentId: payment.id, handler: 'python_for_devops_2026', error: emailError instanceof Error ? emailError.message : 'Unknown error' });
          return NextResponse.json({ message: 'Python for DevOps 2026 webinar payment processed but email failed' }, { status: 200, headers: corsHeaders });
        }
      },
      // Alternative label for compatibility
      python_devops_webinar: async () => {
        try {
          await sendPythonDevOpsWebinarEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          logEvent('WEBHOOK_SUCCESS', { requestId, paymentId: payment.id, emailSent: true, handler: 'python_devops_webinar' });
          return NextResponse.json({ message: 'Python for DevOps 2026 webinar payment processed and email sent successfully' }, { status: 200, headers: corsHeaders });
        } catch (emailError) {
          logEvent('EMAIL_SEND_FAILED', { requestId, paymentId: payment.id, handler: 'python_devops_webinar', error: emailError instanceof Error ? emailError.message : 'Unknown error' });
          return NextResponse.json({ message: 'Python for DevOps 2026 webinar payment processed but email failed' }, { status: 200, headers: corsHeaders });
        }
      },
      // Docker & Kubernetes Webinar 2026 (inline email send)
      docker_kubernetes_webinar_2026: async () => {
        try {
          await sendDockerKubernetesWebinarEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          logEvent('WEBHOOK_SUCCESS', { requestId, paymentId: payment.id, emailSent: true, handler: 'docker_kubernetes_webinar_2026' });
          return NextResponse.json({ message: 'Docker & Kubernetes 2026 webinar payment processed and email sent successfully' }, { status: 200, headers: corsHeaders });
        } catch (emailError) {
          logEvent('EMAIL_SEND_FAILED', { requestId, paymentId: payment.id, handler: 'docker_kubernetes_webinar_2026', error: emailError instanceof Error ? emailError.message : 'Unknown error' });
          return NextResponse.json({ message: 'Docker & Kubernetes 2026 webinar payment processed but email failed' }, { status: 200, headers: corsHeaders });
        }
      },
      // Alternative label for compatibility
      docker_k8s_webinar: async () => {
        try {
          await sendDockerKubernetesWebinarEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          logEvent('WEBHOOK_SUCCESS', { requestId, paymentId: payment.id, emailSent: true, handler: 'docker_k8s_webinar' });
          return NextResponse.json({ message: 'Docker & Kubernetes 2026 webinar payment processed and email sent successfully' }, { status: 200, headers: corsHeaders });
        } catch (emailError) {
          logEvent('EMAIL_SEND_FAILED', { requestId, paymentId: payment.id, handler: 'docker_k8s_webinar', error: emailError instanceof Error ? emailError.message : 'Unknown error' });
          return NextResponse.json({ message: 'Docker & Kubernetes 2026 webinar payment processed but email failed' }, { status: 200, headers: corsHeaders });
        }
      },
      // Testing: run all handlers/emails
      testing: async () => {
        const makeReq = () => new Request(request.url, { method: request.method, headers: request.headers, body: rawBody });
        const results: Array<{ handler: string; ok: boolean; status?: number; error?: string }> = [];

        // AWS
        try {
          const { POST } = await import('../courses/aws-devops/route');
          const res = await Promise.race([
            POST(makeReq()),
            new Promise<Response>((_, reject) => setTimeout(() => reject(new Error('AWS handler timeout')), 30000))
          ]);
          if (!res.ok) {
            const err = await res.text();
            results.push({ handler: 'aws_course', ok: false, status: res.status, error: err });
          } else {
            results.push({ handler: 'aws_course', ok: true, status: res.status });
          }
        } catch (e) {
          results.push({ handler: 'aws_course', ok: false, error: (e as Error)?.message || 'Unknown error' });
        }

        // Azure
        try {
          const { POST } = await import('../courses/azure-devops/route');
          const res = await Promise.race([
            POST(makeReq()),
            new Promise<Response>((_, reject) => setTimeout(() => reject(new Error('Azure handler timeout')), 30000))
          ]);
          if (!res.ok) {
            const err = await res.text();
            results.push({ handler: 'azure_course', ok: false, status: res.status, error: err });
          } else {
            results.push({ handler: 'azure_course', ok: true, status: res.status });
          }
        } catch (e) {
          results.push({ handler: 'azure_course', ok: false, error: (e as Error)?.message || 'Unknown error' });
        }

        // Docker & Kubernetes
        try {
          const { POST } = await import('../courses/docker-kubernetes/route');
          const res = await Promise.race([
            POST(makeReq()),
            new Promise<Response>((_, reject) => setTimeout(() => reject(new Error('Docker K8s handler timeout')), 30000))
          ]);
          if (!res.ok) {
            const err = await res.text();
            results.push({ handler: 'docker_kubernetes', ok: false, status: res.status, error: err });
          } else {
            results.push({ handler: 'docker_kubernetes', ok: true, status: res.status });
          }
        } catch (e) {
          results.push({ handler: 'docker_kubernetes', ok: false, error: (e as Error)?.message || 'Unknown error' });
        }

        // Roadmap webinar email inline
        try {
          await sendRoadmapWebinarEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          results.push({ handler: 'roadmap_webinar', ok: true });
        } catch (e) {
          results.push({ handler: 'roadmap_webinar', ok: false, error: (e as Error)?.message || 'Unknown error' });
        }

        // AWS DevOps course email inline
        try {
          await sendAWSCourseEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          results.push({ handler: 'aws_devops_course', ok: true });
        } catch (e) {
          results.push({ handler: 'aws_devops_course', ok: false, error: (e as Error)?.message || 'Unknown error' });
        }

        // Python for DevOps 2026 webinar email inline
        try {
          await sendPythonDevOpsWebinarEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          results.push({ handler: 'python_for_devops_2026', ok: true });
        } catch (e) {
          results.push({ handler: 'python_for_devops_2026', ok: false, error: (e as Error)?.message || 'Unknown error' });
        }

        // Docker & Kubernetes 2026 webinar email inline
        try {
          await sendDockerKubernetesWebinarEmail({
            email: payment.email,
            amount: payment.amount,
            id: payment.id,
            name: payment.notes?.name,
            contact: payment.contact
          });
          results.push({ handler: 'docker_kubernetes_webinar_2026', ok: true });
        } catch (e) {
          results.push({ handler: 'docker_kubernetes_webinar_2026', ok: false, error: (e as Error)?.message || 'Unknown error' });
        }

        logEvent('TESTING_RUN_COMPLETED', { requestId, paymentId: payment.id, label: 'testing', results });
        const allOk = results.every(r => r.ok);
        return NextResponse.json({ message: 'Testing run executed', results }, { status: allOk ? 200 : 207, headers: corsHeaders });
      }
    };

    // Route based on label
    if (!label || !routingMap[label]) {
      logEvent('UNKNOWN_OR_MISSING_LABEL', {
        requestId,
        paymentId: payment.id,
        label: label ?? null,
        notes: payment.notes || null
      });
      return NextResponse.json({ error: 'Unknown or missing label' }, { status: 400, headers: corsHeaders });
    }

    // Create a fresh Request with raw body for downstream handlers to verify signatures
    const forwardRequest = new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: rawBody
    });

    try {
      const invoke = routingMap[label];
      const response = await Promise.race([
        // Only pass forwardRequest to handlers that accept it
        (invoke.length > 0 ? invoke(forwardRequest) : invoke()),
        new Promise<Response>((_, reject) => setTimeout(() => reject(new Error('Handler timeout')), 30000))
      ]);

      if (!response.ok) {
        const errorText = await response.text();
        logEvent('HANDLER_ERROR', { requestId, paymentId: payment.id, label, status: response.status, error: errorText });
        return NextResponse.json({ error: 'Handler returned error' }, { status: 500, headers: corsHeaders });
      }

      logEvent('ROUTED_BY_LABEL', { requestId, paymentId: payment.id, label, status: response.status });
      return response;
    } catch (e) {
      const errMsg = (e as Error)?.message ?? 'Unknown error';
      logEvent('ROUTING_FAILED', { requestId, paymentId: payment.id, label, error: errMsg });
      return NextResponse.json({ error: 'Failed to route by label' }, { status: 500, headers: corsHeaders });
    }

  } catch (error) {
    logEvent('WEBHOOK_ERROR', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
