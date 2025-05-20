// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Try multiple ways to get environment variables
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  process.env.VITE_SUPABASE_URL ||
  window.env.VITE_SUPABASE_URL;

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  process.env.VITE_SUPABASE_ANON_KEY ||
  window.env.VITE_SUPABASE_ANON_KEY;

// Debug output - will appear in browser console
console.log('Supabase Config:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 25)}...` : 'MISSING',
  key: supabaseAnonKey ? '***' + supabaseAnonKey.slice(-4) : 'MISSING',
  env: {
    meta: import.meta.env,
    process: process.env,
    window: window.env
  }
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Current environment:', process.env.NODE_ENV);
  throw new Error(`
  Supabase configuration missing!
  Check your environment variables in Netlify:
  
  1. Go to Site settings → Environment variables
  2. Add both:
     - VITE_SUPABASE_URL = https://your-ref.supabase.co
     - VITE_SUPABASE_ANON_KEY = your-anon-key
  
  Current values:
  VITE_SUPABASE_URL = ${supabaseUrl || 'undefined'}
  VITE_SUPABASE_ANON_KEY = ${supabaseAnonKey ? '***' + supabaseAnonKey.slice(-4) : 'undefined'}
  `);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});