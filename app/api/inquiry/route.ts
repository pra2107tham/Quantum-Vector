import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

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

// Send notification email
async function sendNotificationEmail(inquiryData: { name: string; email: string; phone: string; type: string; message: string }) {
  const { name, email, phone, type, message } = inquiryData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "frontdesk@thedevopscommunity.com",
    subject: `New ${type} Inquiry from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1447E6; text-align: center;">New Inquiry Received</h1>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333;">Inquiry Details:</h2>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #fff; border-radius: 5px; border-left: 4px solid #1447E6;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p style="margin: 5px 0;"><strong>Type:</strong> ${type}</p>
            <p style="margin: 5px 0;"><strong>Message:</strong></p>
            <p style="margin: 5px 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666;">This inquiry has been saved to the database.</p>
          </div>
        </div>

        <div style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
          <p>This is an automated email. Please do not reply directly to this message.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully');
  } catch (error) {
    console.error('Error sending notification email:', error);
    // Don't throw the error - we still want to save the inquiry even if email fails
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, type, message } = await request.json();

    // Validate required fields
    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name,
          email,
          phone,
          type,
          message
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting inquiry:', error);
      return NextResponse.json(
        { error: 'Failed to submit inquiry' },
        { status: 500 }
      );
    }

    // Send notification email
    await sendNotificationEmail({ name, email, phone, type, message });

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
