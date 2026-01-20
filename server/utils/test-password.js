import dotenv from 'dotenv';
import { supabaseAdmin } from '../config/supabase.js';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const testPassword = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('password')
      .eq('email', 'admin@blitzs.dev')
      .single();

    if (error) {
      console.log('❌ Error:', error.message);
      return;
    }

    const hashedPassword = data.password;
    const testPassword = 'admin123456';
    
    console.log('🔒 Testing password verification...');
    console.log('📝 Test password:', testPassword);
    console.log('🔐 Hashed password:', hashedPassword.substring(0, 20) + '...');
    
    const isValid = await bcrypt.compare(testPassword, hashedPassword);
    
    console.log('✅ Password valid:', isValid);
    
    if (!isValid) {
      // Let's try creating a new hash and compare
      console.log('🔧 Creating new hash for comparison...');
      const newHash = await bcrypt.hash(testPassword, 12);
      console.log('🆕 New hash:', newHash.substring(0, 20) + '...');
      
      const isNewValid = await bcrypt.compare(testPassword, newHash);
      console.log('✅ New hash valid:', isNewValid);
    }
    
  } catch (error) {
    console.error('❌ Error testing password:', error);
  }
};

testPassword();
