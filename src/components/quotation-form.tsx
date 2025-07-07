// src/components/quotation-form.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { supabase } from "@/lib/supabase" // <--- ADDED: Import your Supabase client

export default function QuotationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "India",
    description: "",
  })
  // <--- ADDED: State for managing submission status feedback to the user
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // <--- MODIFIED: handleSubmit function to be asynchronous and handle Supabase insertion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionStatus('Submitting...'); // Set status to indicate submission is in progress

    try {
      const { data, error } = await supabase
        .from('patentability-requests') // Your Supabase table name
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            description: formData.description,
            // 'id' and 'created_at' columns are usually handled automatically by Supabase
          },
        ])
        .select(); // Use .select() to get the inserted data back if you need it

      if (error) {
        console.error('Supabase insertion error:', error);
        setSubmissionStatus(`Error: ${error.message}`); // Display specific error message
      } else {
        console.log('Submission successful:', data);
        setSubmissionStatus('Request submitted successfully! We will contact you shortly.');
        // Clear form fields on successful submission
        setFormData({ fullName: "", email: "", phone: "", country: "India", description: "" });
      }
    } catch (error: any) { // Catch any unexpected errors during the try block
      console.error('An unexpected error occurred during submission:', error);
      setSubmissionStatus(`An unexpected error occurred: ${error.message || 'Please try again.'}`);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Quotation</h3>
      <p className="text-gray-600 mb-8">Get a personalized quote for your patentability search needs.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country of Interest *
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="India">India</option>
            <option value="US">US</option>
            <option value="Japan">Japan</option>
            <option value="Europe">Europe</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Brief Description of Invention *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-vertical"
            placeholder="Provide a detailed description of your invention, including key features, functionality, and any unique aspects that distinguish it from existing solutions..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors duration-300 shadow-sm"
          // <--- ADDED: Disable button while submitting
          disabled={submissionStatus.includes('Submitting')}
        >
          {/* <--- MODIFIED: Button text changes based on submission status */}
          {submissionStatus.includes('Submitting') ? 'Submitting...' : 'Submit Request'}
        </button>

        {/* <--- ADDED: Display submission status messages */}
        {submissionStatus && (
          <p className={`mt-4 text-center ${submissionStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {submissionStatus}
          </p>
        )}
      </form>
    </div>
  )
}