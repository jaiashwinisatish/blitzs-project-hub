import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabaseUrl = process.env.SUPABASE_URL || 'https://afgromdzethkscaskofz.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_uc-Q0_9szmdqnrMPE0-QGQ_Og9mhzx4';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required');
}

// Public client for user operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service role client for admin operations
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_KEY || 'sb_secret_rQy6ancr1S6Dwwc8SjZ1Rg_aPqbcn9-', {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Verify JWT token from Supabase
export const verifySupabaseToken = async (token) => {
  try {
    // First try to decode with JWT
    const decoded = jwt.decode(token);
    if (!decoded) {
      throw new Error('Invalid token');
    }

    // Verify with Supabase
    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      throw new Error('Invalid token');
    }

    return data.user;
  } catch (error) {
    console.error('Token verification error:', error);
    throw new Error('Invalid authentication token');
  }
};

// Create custom JWT for our API
export const createCustomToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Verify custom JWT
export const verifyCustomToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
