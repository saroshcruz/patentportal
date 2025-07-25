'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ValidateIdeaPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/patent-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <span className="text-xl mr-2">🏠</span>
        <span>Home</span>
      </Link>    
      <h1 className="text-3xl font-bold mb-6">Check if Your Idea is Patentable</h1>
      <p className="mb-8 text-gray-700 text-lg">
        Our experts can help you with <strong>patents</strong>, <strong>trade secrets</strong>, <strong>copyrights</strong>,           and more.
        Please feel free to let us know the service you're looking for by submitting the form below — 
        we'll get back to you within 24 hours with next steps or a free consultation.
      </p>    
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          placeholder="Briefly describe your idea"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Submit'}
        </button>
        {status === 'success' && (
          <p className="text-green-600 mt-2">Thank you! We’ll contact you shortly.</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 mt-2">Something went wrong. Please try again.</p>
        )}
      </form>
    </main>
  );
}
