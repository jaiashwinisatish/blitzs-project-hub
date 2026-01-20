import dotenv from 'dotenv';
import { supabaseAdmin } from '../config/supabase.js';

// Load environment variables
dotenv.config();

const checkAdminUser = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', 'admin@blitzs.dev')
      .single();

    if (error) {
      console.log('❌ Error finding admin user:', error.message);
      return;
    }

    if (data) {
      console.log('✅ Admin user found:');
      console.log('📧 Email:', data.email);
      console.log('👤 Name:', data.full_name);
      console.log('🔑 Role:', data.role);
      console.log('🆔 ID:', data.id);
      console.log('📅 Created:', data.created_at);
      console.log('🔒 Password hash exists:', !!data.password);
    } else {
      console.log('❌ Admin user not found in database');
    }
  } catch (error) {
    console.error('❌ Error checking admin user:', error);
  }
};

checkAdminUser();
