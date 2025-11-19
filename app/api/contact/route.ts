import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// List of disposable email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 
  'throwaway.email', 'mailinator.com', 'trashmail.com'
];

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
  
  // reCAPTCHA v3 returns a score from 0.0 to 1.0
  // 0.0 is very likely a bot, 1.0 is very likely a human
  // We'll set threshold at 0.5 (you can adjust this)
  return data.success && data.score >= 0.5;
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_EMAIL_DOMAINS.some(disposable => domain === disposable);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, recaptchaToken } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
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
      // IMPORTANT: Change the 'from' email to service@klein.plumbing once verified with Resend!
      from: 'Klein Plumbing Website <onboarding@resend.dev>', 
      to: [process.env.CONTACT_EMAIL as string], // Sends to service@klein.plumbing from .env
      replyTo: email, // Allows easy reply to the customer
      subject: `NEW LEAD: ${name} (via Website Form)`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        
        Message:
        ${message}
        
        ---
        Submitted via website form with verified reCAPTCHA
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    // Log the error internally but send a generic server error response
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message due to server error.' }, 
      { status: 500 }
    );
  }
}
