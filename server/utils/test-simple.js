import dotenv from 'dotenv';
import { supabaseAdmin } from '../config/supabase.js';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const testSimpleLogin = async () => {
  try {
    // Get the admin user
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', 'admin@blitzs.dev')
      .single();

    if (error || !user) {
      console.log('❌ User not found');
      return;
    }

    console.log('👤 Found user:', user.email);
    
    // Test password
    const testPassword = 'admin123';
    const isValid = await bcrypt.compare(testPassword, user.password);
    
    console.log('🔒 Password test result:', isValid);
    
    if (isValid) {
      console.log('✅ Login should work with:');
      console.log('   Email: admin@blitzs.dev');
      console.log('   Password: admin123');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testSimpleLogin();
