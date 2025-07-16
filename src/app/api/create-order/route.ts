// src/app/api/create-order/route.ts
import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { estimatedCost } = body

    if (!estimatedCost || typeof estimatedCost !== "number") {
      return NextResponse.json({ error: "Invalid or missing estimatedCost" }, { status: 400 })
    }

    const amountINR = Math.round(estimatedCost * 83 * 100) // INR in paise

    const order = await razorpay.orders.create({
      amount: amountINR,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    })

    return NextResponse.json({ orderId: order.id, amount: order.amount }, { status: 200 })
  } catch (err) {
    console.error("❌ Error creating Razorpay order:", err)
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}
