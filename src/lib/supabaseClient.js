import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xtpxmhyjcmiwxuuvtopj.supabase.co" //import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cHhtaHlqY21pd3h1dXZ0b3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NzQ1NjEsImV4cCI6MjA2MzM1MDU2MX0.agBNUNHeGkordVdHFy9IC3-XZlQSTtuow46efl_iarc" //import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `Supabase environment variables not set! Check your .env.local file.
     Received: VITE_SUPABASE_URL=${supabaseUrl}, VITE_SUPABASE_ANON_KEY=${!!supabaseAnonKey}`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);