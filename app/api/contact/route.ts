import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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
    const resend = new Resend(process.env.RESEND_API_KEY);
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
    if (!CONTACT_EMAIL) {
      console.error('CONTACT_EMAIL environment variable is not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await request.json();
    const { name, email, phone, message } = body;

    // Server-side validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name and phone are required' },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || name.length > 200) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }
    if (typeof phone !== 'string' || phone.length > 30) {
      return NextResponse.json({ error: 'Invalid phone' }, { status: 400 });
    }
    if (email !== undefined && (typeof email !== 'string' || email.length > 254)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (message !== undefined && (typeof message !== 'string' || message.length > 5000)) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
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

    // 2. Send notification email to Klein Plumbing
    let notificationSent = false;
    try {
      await resend.emails.send({
        from: 'Klein Plumbing Website <website@klein.plumbing>',
        to: [CONTACT_EMAIL],
        ...(email ? { replyTo: email } : {}),
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
      notificationSent = true;
      console.log('Notification email sent to Klein Plumbing');
    } catch (emailError) {
      console.error('Notification email error:', emailError);
    }

    // 3. Send confirmation email to customer (if email provided)
    let confirmationSent = false;
    if (email) {
      try {
        await resend.emails.send({
          from: 'Klein Plumbing <noreply@klein.plumbing>',
          to: [email],
          subject: 'Thanks for contacting Klein Plumbing!',
          text: `
Hi ${name},

Thanks for reaching out to Klein Plumbing! We've received your message and will get back to you shortly.

Here's what you sent us:
${message ? `Message: ${message}` : ''}
Phone: ${phone}

If you need immediate assistance, please call us at 920-728-3034.

Thanks,
Klein Plumbing LLC
Your trusted plumbing experts serving Jefferson and Southeast Wisconsin

---
Klein Plumbing LLC
920-728-3034
service@klein.plumbing
klein.plumbing
          `,
          html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #333; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
    .footer { background-color: #333; color: #ccc; padding: 20px; text-align: center; font-size: 12px; }
    .button { background-color: #CEDC00; color: #333; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; margin: 20px 0; }
    .highlight { background-color: #fff; padding: 15px; border-left: 4px solid #CEDC00; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Klein Plumbing LLC</h1>
    </div>
    
    <div class="content">
      <h2>Hi ${name},</h2>
      
      <p>Thanks for reaching out to Klein Plumbing! We've received your message and will get back to you shortly.</p>
      
      <div class="highlight">
        <strong>Your Message:</strong><br>
        ${message ? `<p>${message}</p>` : '<p><em>No message provided</em></p>'}
        <strong>Phone:</strong> ${phone}
      </div>
      
      <p><strong>Need immediate assistance?</strong></p>
      <p style="text-align: center;">
        <a href="tel:920-728-3034" class="button">Call 920-728-3034</a>
      </p>
      
      <p>We're your trusted, family-owned plumbing experts serving Jefferson and Southeast Wisconsin.</p>
    </div>
    
    <div class="footer">
      <p><strong>Klein Plumbing LLC</strong></p>
      <p>920-728-3034 | service@klein.plumbing | klein.plumbing</p>
      <p>Quality work, fair prices.</p>
    </div>
  </div>
</body>
</html>
          `,
        });
        confirmationSent = true;
        console.log('Confirmation email sent to customer');
      } catch (emailError) {
        console.error('Customer confirmation email error:', emailError);
        // Don't fail the whole request if confirmation email fails
      }
    }

    // Return success if at least one method worked
    if (localCompassResult.success || notificationSent) {
      return NextResponse.json({
        success: true,
        message: 'Lead received',
        synced: localCompassResult.success,
        notificationSent,
        confirmationSent,
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
