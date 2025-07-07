// src/lib/supabase.ts (for TypeScript)
// or src/lib/supabase.js (for JavaScript)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Optional: Basic validation during development
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing from environment variables! Please check your .env.local file.');
}

// Create and export the Supabase client instance
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);