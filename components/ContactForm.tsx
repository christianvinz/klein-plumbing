'use client';

import { useState, useEffect } from 'react';

// Declare the grecaptcha global type
declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Load reCAPTCHA script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Check honeypot field (bots will fill this out, humans won't see it)
    if (data.website) {
      console.log('Bot detected via honeypot');
      setStatus('success'); // Pretend it worked so bot doesn't know
      (e.target as HTMLFormElement).reset();
      return;
    }

    // Remove honeypot from data before sending
    delete data.website;

    try {
      // Get reCAPTCHA token
      if (!recaptchaLoaded || !window.grecaptcha) {
        throw new Error('reCAPTCHA not loaded');
      }

      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'submit' }
      );

      // Send form data with reCAPTCHA token
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          recaptchaToken: token,
        }),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        console.error('Form submission error:', errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      suppressHydrationWarning={true}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-[#333333] uppercase mb-1">Name</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          required 
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#CEDC00]"
          suppressHydrationWarning={true}
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-[#333333] uppercase mb-1">Email</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          required 
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#CEDC00]" 
          suppressHydrationWarning={true}
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-bold text-[#333333] uppercase mb-1">Phone</label>
        <input 
          type="tel" 
          name="phone" 
          id="phone" 
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#CEDC00]" 
          suppressHydrationWarning={true}
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-[#333333] uppercase mb-1">How can we help?</label>
        <textarea 
          name="message" 
          id="message" 
          rows={4} 
          required 
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#CEDC00]" 
          suppressHydrationWarning={true}
        />
      </div>

      {/* Honeypot field - hidden from users, but bots will fill it out */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
        }}
      />
      
      <button 
        type="submit" 
        disabled={status === 'loading' || status === 'success'} 
        className="w-full bg-[#333333] text-white font-bold uppercase py-3 hover:bg-[#CEDC00] hover:text-[#333333] transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
      </button>
      
      {status === 'success' && (
        <p className="text-green-600 text-sm text-center font-bold">
          Thanks! We'll be in touch soon.
        </p>
      )}
      
      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">
          Something went wrong. Please call us at 920-728-3034.
        </p>
      )}

      {/* reCAPTCHA badge notice */}
      <p className="text-xs text-gray-500 text-center">
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and{' '}
        <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
      </p>
    </form>
  );
}
