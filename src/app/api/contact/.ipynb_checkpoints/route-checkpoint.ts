
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import nodemailer from 'nodemailer';
import { createClient } supabase from '@/lib/supabase'; // adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const {
    name,
    email,
    phone,
    message,
    payment_id,
    complexity,
    urgency,
  } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send admin email
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

    // Store in Supabase
   
    const { data, error: dbError } = await supabase.from('ipfiling').insert([
      {
        name,
        email,
        phone,
        message,
        payment_id,
        complexity,
        urgency,
        created_at: new Date().toISOString(),  
        //created_at: new Date().toISOString(), // optional
          
      },
    ]);

    if (dbError) {
      console.error('❌ Supabase Insert Error:', dbError);
      return res.status(500).json({ success: false, message: 'Failed to save to Supabase' });
    }

    console.log('✅ Supabase insert success:', data);
    res.status(200).json({ success: true, message: 'Lead saved and email sent' });

  } catch (err) {
    console.error('❌ Email/Supabase Error:', err);
    res.status(500).json({ success: false, message: 'Failed to process lead' });
  }
}


/*
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import supabase from '@/lib/supabase'; // adjust path if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { name, email, phone, message, payment_id } = req.body;

  // Send email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Patent Site" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: '📥 New Patent Inquiry',
      html: `
        <h2>New Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Payment ID:</strong> ${payment_id}</p>
      `,
    });

    // Insert into Supabase
    const { data, error } = await supabase.from('ipfiling').insert([
      { name, email, phone, message, payment_id },
    ]);

    if (error) {
      console.error('❌ Supabase Insert Error:', error.message);
      return res.status(500).json({ success: false, message: 'Supabase insert failed' });
    }

    res.status(200).json({ success: true, message: 'Email sent and record saved' });
  } catch (err: any) {
    console.error('Nodemailer or DB Error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to send email or insert into DB' });
  }
}

*/
/*
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import supabase from '@/lib/supabase'; // adjust path if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { name, email, phone, message, payment_id } = req.body;

  // Send email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Patent Site" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: '📥 New Patent Inquiry',
      html: `
        <h2>New Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Payment ID:</strong> ${payment_id}</p>
      `,
    });

    // Insert into Supabase
    const { data, error } = await supabase.from('ipfiling').insert([
      { name, email, phone, message, payment_id },
    ]);

    if (error) {
      console.error('❌ Supabase Insert Error:', error.message);
      return res.status(500).json({ success: false, message: 'Supabase insert failed' });
    }

    res.status(200).json({ success: true, message: 'Email sent and record saved' });
  } catch (err: any) {
    console.error('Nodemailer or DB Error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to send email or insert into DB' });
  }
}
*/