// src/components/quotation-form.tsx

"use client"

import { useState } from "react"
import Script from "next/script"

export default function QuotationForm({ estimatedData }: { estimatedData: any }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "India",
    description: "",
  })

  const [submissionStatus, setSubmissionStatus] = useState("")
  const [isPaying, setIsPaying] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!estimatedData || typeof estimatedData.estimatedCost !== "number") {
      console.error("❌ Missing or invalid estimatedData:", estimatedData)
      setSubmissionStatus("Please use the estimator before submitting.")
      return
    }

    setIsPaying(true)

    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estimatedCost: estimatedData.estimatedCost,
        }),
      })

      const { orderId, amount } = await orderRes.json()

      const razorpay = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Patentability",
        description: "Patent Search Estimate",
        order_id: orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          })

          const { verified } = await verifyRes.json()
          if (!verified) {
            setSubmissionStatus("❌ Payment verification failed.")
            return
          }

          const contactRes = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              message: formData.description,
              complexity: estimatedData?.complexity,
              payment_id: response.razorpay_payment_id,
            }),
          })

          const result = await contactRes.json()
          if (result.success) {
            setSubmissionStatus("✅ Successfully submitted and paid.")
            setFormData({ fullName: "", email: "", phone: "", country: "India", description: "" })
          } else {
            setSubmissionStatus("⚠️ Payment done, but submission failed.")
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#1e3a8a" },
      })

      razorpay.open()
    } catch (err) {
      console.error(err)
      setSubmissionStatus("⚠️ Unexpected error during payment.")
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Quotation</h3>
        <p className="text-gray-600 mb-8">Get a personalized quote for your patentability search needs.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="w-full border px-4 py-3 rounded-lg" />
          <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full border px-4 py-3 rounded-lg" />
          <input type="text" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="w-full border px-4 py-3 rounded-lg" />
          <select name="country" value={formData.country} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg">
            <option value="India">India</option>
            <option value="US">US</option>
            <option value="Japan">Japan</option>
            <option value="Europe">Europe</option>
            <option value="Other">Other</option>
          </select>
          <textarea name="description" required value={formData.description} onChange={handleInputChange} placeholder="Describe your invention..." className="w-full border px-4 py-3 rounded-lg" rows={5} />

          <button type="submit" disabled={isPaying} className="w-full bg-blue-900 text-white py-4 rounded-lg">
            {isPaying ? "Processing..." : "Submit & Pay"}
          </button>

          {submissionStatus && (
            <p className={`mt-4 text-center ${submissionStatus.includes("✅") ? "text-green-600" : "text-red-600"}`}>
              {submissionStatus}
            </p>
          )}
        </form>
      </div>
    </>
  )
}
