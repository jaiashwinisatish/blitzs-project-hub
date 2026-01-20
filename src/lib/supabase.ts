import { createClient } from '@supabase/supabase-js';

// Safe environment variable access with fallbacks
const getSupabaseUrl = () => {
  if (typeof window !== 'undefined') {
    return import.meta.env.VITE_SUPABASE_URL || 
           process.env.REACT_APP_SUPABASE_URL ||
           'https://afgromdzethkscaskofz.supabase.co';
  }
  return process.env.SUPABASE_URL || 
         'https://afgromdzethkscaskofz.supabase.co';
};

const getSupabaseAnonKey = () => {
  if (typeof window !== 'undefined') {
    return import.meta.env.VITE_SUPABASE_ANON_KEY || 
           process.env.REACT_APP_SUPABASE_ANON_KEY ||
           'sb_publishable_uc-Q0_9szmdqnrMPE0-QGQ_Og9mhzx4';
  }
  return process.env.SUPABASE_ANON_KEY || 
         'sb_publishable_uc-Q0_9szmdqnrMPE0-QGQ_Og9mhzx4';
};

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseAnonKey();

// Validate environment variables with safe fallbacks
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Using fallback values for development.');
}

// Create Supabase client with production-safe configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.39.0'
    }
  },
  // Add error handling for production
  db: {
    schema: 'public'
  }
});

// Helper function to check if Supabase is properly initialized
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && 
           supabaseUrl !== 'https://afgromdzethkscaskofz.supabase.co');
};

export default supabase;
