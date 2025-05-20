// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Solution 1: Check multiple environment variable sources
const getEnvVar = (key) => {
  // Try Vite's import.meta.env first
  if (import.meta.env[key]) return import.meta.env[key];
  
  // Try process.env (for Node during build)
  if (process.env[key]) return process.env[key];
  
  // Try globalThis for runtime (Netlify injects here)
  if (globalThis?.env?.[key]) return globalThis.env[key];
  
  return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// Debug output
console.log('Environment Sources:', {
  'import.meta.env': import.meta.env,
  'process.env': process.env,
  'globalThis.env': globalThis?.env
});

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = [
    'Supabase configuration missing!',
    'Expected environment variables:',
    '- VITE_SUPABASE_URL',
    '- VITE_SUPABASE_ANON_KEY',
    '',
    'Netlify setup:',
    '1. Go to Site settings → Environment variables',
    '2. Add both variables (no VITE_ prefix needed in Netlify)',
    '3. Redeploy your site'
  ].join('\n');
  
  throw new Error(errorMessage);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});