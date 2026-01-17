import dotenv from 'dotenv';
import { supabaseAdmin } from '../config/supabase.js';

// Load environment variables
dotenv.config();

const debugLogin = async () => {
  try {
    console.log('🔍 Debugging login for admin@blitzs.dev...');
    
    // Test 1: Direct query
    console.log('\n1️⃣ Testing direct query...');
    const { data: directQuery, error: directError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', 'admin@blitzs.dev');
    
    console.log('Direct query result:', { 
      found: directQuery?.length || 0, 
      error: directError?.message,
      data: directQuery?.[0]?.email
    });

    // Test 2: Single query (what auth controller uses)
    console.log('\n2️⃣ Testing single query...');
    const { data: singleQuery, error: singleError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', 'admin@blitzs.dev')
      .single();
    
    console.log('Single query result:', { 
      found: !!singleQuery, 
      error: singleError?.message,
      data: singleQuery?.email
    });

    // Test 3: Check if table exists
    console.log('\n3️⃣ Testing table existence...');
    const { data: tableCheck, error: tableError } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1);
    
    console.log('Table check result:', { 
      accessible: !tableError, 
      error: tableError?.message
    });

  } catch (error) {
    console.error('❌ Debug error:', error);
  }
};

debugLogin();
