import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Klein Plumbing's Business ID in Local Compass
const KLEIN_BUSINESS_ID = '59fb3928-14a3-4bba-a304-e06a31776ca7';
const LOCAL_COMPASS_URL = 'https://local.brinleyatlas.com/api/webhooks/form-submission';

// List of disposable email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 
  'throwaway.email', 'mailinator.com', 'trashmail.com'
];

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_EMAIL_DOMAINS.some(disposable => domain === disposable);
}

async function sendToLocalCompass(data: {
  name: string;
  email?: string;
  phone: string;
  message?: string;
}) {
  try {
    const response = await fetch(LOCAL_COMPASS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        businessId: KLEIN_BUSINESS_ID,
        name: data.name,
        email: data.email || null,
        phone: data.phone,
        message: data.message || null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Local Compass webhook error:', errorData);
      return { success: false, error: errorData };
    }

    const result = await response.json();
    console.log('Lead sent to Local Compass:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending to Local Compass:', error);
    return { success: false, error };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Server-side validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name and phone are required' }, 
        { status: 400 }
      );
    }

    // Check for disposable email (if provided)
    if (email && isDisposableEmail(email)) {
      console.log('Disposable email detected:', email);
      return NextResponse.json(
        { error: 'Please use a valid email address' },
        { status: 400 }
      );
    }

    // Basic spam content detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'click here', 'buy now'];
    const hasSpam = spamKeywords.some(keyword => 
      message?.toLowerCase().includes(keyword) || name.toLowerCase().includes(keyword)
    );
    
    if (hasSpam) {
      console.log('Spam keywords detected in submission');
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // 1. Send to Local Compass (for tracking/KPIs)
    const localCompassResult = await sendToLocalCompass({
      name,
      email,
      phone,
      message,
    });

    // 2. Send email notification to service@klein.plumbing
    let emailSent = false;
    try {
      const emailData = await resend.emails.send({
        from: 'Klein Plumbing Website <onboarding@resend.dev>', 
        to: [process.env.CONTACT_EMAIL as string],
        replyTo: email,
        subject: `NEW LEAD: ${name} (via Website Form)`,
        text: `
          Name: ${name}
          Email: ${email || 'Not provided'}
          Phone: ${phone}
          
          Message:
          ${message || 'No message provided'}
          
          ---
          Lead automatically added to Local Compass
          Status: ${localCompassResult.success ? 'Synced ✓' : 'Email only (sync failed)'}
        `,
      });
      emailSent = true;
      console.log('Email sent:', emailData);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue even if email fails - Local Compass has the lead
    }

    // Return success if at least one method worked
    if (localCompassResult.success || emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Lead received',
        synced: localCompassResult.success,
        emailSent,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to process lead' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message due to server error.' }, 
      { status: 500 }
    );
  }
}
