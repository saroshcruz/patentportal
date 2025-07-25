'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/solid'; 

export default function ValidateIdeaPage() {
  const [formData, setFormData] = useState({ title: '', description: '', emailid: "", file: null });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here (to backend, supabase, email, etc.)
    alert("Your idea has been submitted for review.");
  };

  <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
      {/* If using Heroicons */}
      <HomeIcon className="h-6 w-6 mr-2" />
      <span>Home</span>
  </Link>  
    
  return (
    <div className="min-h-screen bg-white py-12 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Check if Your Idea is Patentable</h1>
      <p className="mb-8 text-gray-700 text-lg">
       Our experts can help you with <strong>patents</strong>, <strong>trade secrets</strong>, <strong>copyrights</strong>, and        more. Please feel free to let us know the service you're looking for by submitting the form below — 
       we'll get back to you within 24 hours with next steps or a free consultation.
      </p>  
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Title of your invention"
          className="w-full p-3 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Brief description of your invention"
          className="w-full p-3 border rounded h-32"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Your email id"
          className="w-full p-3 border rounded"
          value={formData.emailid}
          onChange={(e) => setFormData({ ...formData, emailid: e.target.value })}
          required
        />  
        <input
          type="file"
          className="w-full p-3 border rounded"
          onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded">
          Submit for Free Review
        </button>
      </form>
    </div>
  );
}
