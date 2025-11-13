import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
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
        Phone: ${phone}
        
        Message:
        ${message}
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    // Log the error internally but send a generic server error response
    console.error('Resend API Error:', error);
    return NextResponse.json({ error: 'Failed to send message due to server error.' }, { status: 500 });
  }
}
