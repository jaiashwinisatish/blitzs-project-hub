import dotenv from 'dotenv';
import { supabaseAdmin } from '../config/supabase.js';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const createSimpleAdmin = async () => {
  try {
    // Delete existing admin user
    await supabaseAdmin
      .from('users')
      .delete()
      .eq('email', 'admin@blitzs.dev');

    // Create new admin with simple password
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 12);

    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([{
        full_name: 'Admin User',
        email: 'admin@blitzs.dev',
        password: hashedPassword,
        role: 'admin',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.log('❌ Error creating admin:', error.message);
      return;
    }

    console.log('✅ Simple admin created successfully!');
    console.log('📧 Email: admin@blitzs.dev');
    console.log('🔑 Password: admin123');
    console.log('🆔 ID:', data.id);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

createSimpleAdmin();
