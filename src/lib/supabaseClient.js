// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Use Vite's import.meta.env for local development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug output
console.log('Supabase Config:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 25)}...` : 'MISSING',
  key: supabaseAnonKey ? '***' + supabaseAnonKey.slice(-4) : 'MISSING'
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
  Supabase configuration missing!
  Check your environment variables:
  
  VITE_SUPABASE_URL=${supabaseUrl || 'undefined'}
  VITE_SUPABASE_ANON_KEY=${supabaseAnonKey ? 'configured' : 'undefined'}
  
  For Netlify:
  1. Go to Site settings → Environment variables
  2. Add both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
  `);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});