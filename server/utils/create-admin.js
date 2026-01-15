import dotenv from 'dotenv';
import { supabaseAdmin } from '../config/supabase.js';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

// Create initial admin user
export const createAdminUser = async (email, password, fullName) => {
  try {
    // Check if admin already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      console.log('Admin user already exists');
      return { success: false, message: 'Admin user already exists' };
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([{
        full_name: fullName,
        email: email,
        password: hashedPassword,
        role: 'admin',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating admin:', error);
      return { success: false, message: error.message };
    }

    console.log('✅ Admin user created successfully!');
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Name: ${fullName}`);
    console.log(`🔑 Role: admin`);

    return { 
      success: true, 
      data: { 
        id: data.id, 
        email: data.email, 
        fullName: data.full_name,
        role: data.role 
      },
      message: 'Admin user created successfully' 
    };

  } catch (error) {
    console.error('Error in createAdminUser:', error);
    return { success: false, message: 'Failed to create admin user' };
  }
};

// Command line interface for creating admin
if (process.argv[2] === 'create-admin') {
  const email = process.argv[3] || 'admin@blitzs.dev';
  const password = process.argv[4] || 'admin123456';
  const fullName = process.argv[5] || 'Admin User';

  console.log('🚀 Creating admin user...');
  console.log(`📧 Email: ${email}`);
  console.log(`👤 Name: ${fullName}`);
  
  await createAdminUser(email, password, fullName);
}
