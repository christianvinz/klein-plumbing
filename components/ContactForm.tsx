'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      suppressHydrationWarning={true} // Still keeping this, just in case
    >
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-[#333333] uppercase mb-1">Name</label>
        <input 
          type="text" name="name" id="name" required 
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#CEDC00]"
          suppressHydrationWarning={true} // FIX: Added
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-[#333333] uppercase mb-1">Email</label>
        <input 
          type="email" name="email" id="email" required 
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#CEDC00]" 
          suppressHydrationWarning={true} // FIX: Added
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-bold text-[#333333] uppercase mb-1">Phone</label>
        <input 
          type="tel" name="phone" id="phone" 
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#CEDC00]" 
          suppressHydrationWarning={true} // FIX: Added
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-[#333333] uppercase mb-1">How can we help?</label>
        <textarea 
          name="message" id="message" rows={4} required 
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#CEDC00]" 
          suppressHydrationWarning={true} // FIX: Added
        />
      </div>
      <button type="submit" disabled={status === 'loading' || status === 'success'} className="w-full bg-[#333333] text-white font-bold uppercase py-3 hover:bg-[#CEDC00] hover:text-[#333333] transition-colors disabled:opacity-50">
        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
      </button>
      {status === 'success' && <p className="text-green-600 text-sm text-center font-bold">Thanks! We'll be in touch.</p>}
      {status === 'error' && <p className="text-red-600 text-sm text-center">Something went wrong. Please call us.</p>}
    </form>
  );
}
