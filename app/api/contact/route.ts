import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// List of disposable email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 
  'throwaway.email', 'mailinator.com', 'trashmail.com'
];

// TEMPORARILY DISABLED - Will re-enable once reCAPTCHA propagates
/*
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();
  return data.success && data.score >= 0.5;
}
*/

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_EMAIL_DOMAINS.some(disposable => domain === disposable);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body; // Removed recaptchaToken

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // TEMPORARILY DISABLED - reCAPTCHA verification
    // Will re-enable once reCAPTCHA propagates (usually 30-60 minutes)
    /*
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      console.log('reCAPTCHA verification failed - likely bot');
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 403 }
      );
    }
    */

    // Check for disposable email
    if (isDisposableEmail(email)) {
      console.log('Disposable email detected:', email);
      return NextResponse.json(
        { error: 'Please use a valid email address' },
        { status: 400 }
      );
    }

    // Basic spam content detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'click here', 'buy now'];
    const hasSpam = spamKeywords.some(keyword => 
      message.toLowerCase().includes(keyword) || name.toLowerCase().includes(keyword)
    );
    
    if (hasSpam) {
      console.log('Spam keywords detected in submission');
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Send the email
    const data = await resend.emails.send({
      from: 'Klein Plumbing Website <onboarding@resend.dev>', 
      to: [process.env.CONTACT_EMAIL as string],
      replyTo: email,
      subject: `NEW LEAD: ${name} (via Website Form)`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        
        Message:
        ${message}
        
        ---
        TEMPORARY: Submitted without reCAPTCHA verification (will be re-enabled soon)
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message due to server error.' }, 
      { status: 500 }
    );
  }
}
