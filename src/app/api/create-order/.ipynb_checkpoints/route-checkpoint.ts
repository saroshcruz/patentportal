/*
// pages/api/create-order.ts
// pages/api/create-order.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const order = await razorpay.orders.create({
      amount: 49900, // ₹499 in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (err) {
    console.error('❌ Razorpay error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
}
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Pricing rules
const baseServiceUSD = 500;
const complexityMultiplier = {
  Low: 1.0,
  Medium: 1.2,
  High: 1.5,
};
const urgencyMultiplier = {
  "7-10 working days": 1.0,
  "3-5 working days": 1.3,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { complexity, urgency } = req.body;

    if (!complexityMultiplier[complexity] || !urgencyMultiplier[urgency]) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const totalUSD = baseServiceUSD * complexityMultiplier[complexity] * urgencyMultiplier[urgency];
    const amountINR = Math.round(totalUSD * 83 * 100); // USD to paise

    const order = await razorpay.orders.create({
      amount: amountINR,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    //console.error('❌ Razorpay error:', err);
    //res.status(500).json({ error: 'Order creation failed' });
    console.error(err); // server side
    res.status(500).json({ success: false, message: "Internal Server Error" }); // client
  }
}
