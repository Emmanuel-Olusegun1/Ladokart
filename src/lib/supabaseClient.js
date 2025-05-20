// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// 1. First try Vite's import.meta.env (local development)
// 2. Then try Netlify's process.env (production)
// 3. Fallback to hardcoded values if both fail (remove after testing)
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  process.env.SUPABASE_URL ||
 'https://xtpxmhyjcmiwxuuvtopj.supabase.co'; // TEMPORARY - REMOVE AFTER TESTING

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  process.env.SUPABASE_ANON_KEY ||
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cHhtaHlqY21pd3h1dXZ0b3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NzQ1NjEsImV4cCI6MjA2MzM1MDU2MX0.agBNUNHeGkordVdHFy9IC3-XZlQSTtuow46efl_iarc'; // TEMPORARY - REMOVE AFTER TESTING

// Debug output
console.log('Supabase Configuration Loaded:', {
  source: import.meta.env.VITE_SUPABASE_URL ? 'Vite (local)' : 
         process.env.SUPABASE_URL ? 'Netlify (production)' : 
         'Hardcoded (temporary)',
  url: supabaseUrl ? `${supabaseUrl.substring(0, 25)}...` : 'MISSING',
  key: supabaseAnonKey ? '***' + supabaseAnonKey.slice(-4) : 'MISSING'
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Current environment variables:', {
    'import.meta.env': import.meta.env,
    'process.env': process.env
  });
  
  throw new Error(
    `Supabase configuration missing!\n\n` +
    `For local development:\n` +
    `1. Create .env.local file in project root\n` +
    `2. Add:\n` +
    `VITE_SUPABASE_URL=https://your-project-ref.supabase.co\n` +
    `VITE_SUPABASE_ANON_KEY=your-anon-key\n\n` +
    `For Netlify production:\n` +
    `1. Go to Site settings → Environment variables\n` +
    `2. Add:\n` +
    `SUPABASE_URL (value: your Supabase URL)\n` +
    `SUPABASE_ANON_KEY (value: your anon key)\n` +
    `3. Clear cache and redeploy`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});