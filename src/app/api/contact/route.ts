// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, payment_id, complexity, urgency } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Patent Site" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: '📥 New Patent Inquiry + Payment Received',
      html: `
        <h2>New Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Complexity:</strong> ${complexity || 'N/A'}</p>
        <p><strong>Urgency:</strong> ${urgency || 'N/A'}</p>
        <p><strong>Payment ID:</strong> ${payment_id || 'N/A'}</p>
      `,
    });

    const { data, error: dbError } = await supabase.from('leads').insert([
      {
        name,
        email,
        phone,
        message,
        payment_id,
        complexity,
        urgency,
        created_at: new Date().toISOString(),
      },
    ]);

    if (dbError) {
      console.error('❌ Supabase Insert Error:', dbError);
      return NextResponse.json({ success: false, message: 'Failed to save to Supabase' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Lead saved and email sent' });
  } catch (err) {
    console.error('❌ Email/Supabase Error:', err);
    return NextResponse.json({ success: false, message: 'Failed to process lead' }, { status: 500 });
  }
}
