import { createClient } from '@supabase/supabase-js';

// Create Supabase client - you'll need to provide your actual credentials
const supabase = createClient(
  'https://afgromdzethkscaskofz.supabase.co',
  'YOUR_ACTUAL_ANON_KEY_HERE' // Replace with your real key
);

export const diagnoseDatabase = async () => {
  console.log('🔍 Diagnosing Supabase database...');
  
  // Test 1: Check connection
  try {
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1);
    if (error) {
      console.log('❌ Connection test failed:', error.message);
    } else {
      console.log('✅ Connection successful');
    }
  } catch (err) {
    console.log('❌ Connection error:', err);
  }

  // Test 2: List all tables
  try {
    const { data, error } = await supabase.rpc('get_tables');
    console.log('📋 Available tables:', data || error);
  } catch (err) {
    console.log('❌ Could not list tables:', err);
  }

  // Test 3: Try different table names for developers
  const devTables = ['developers', 'team', 'staff', 'users', 'team_members'];
  for (const tableName of devTables) {
    try {
      const { data, error } = await supabase.from(tableName).select('*').limit(1);
      if (!error && data) {
        console.log(`✅ Found developers table: ${tableName}`);
        console.log('Sample data:', data);
        break;
      }
    } catch (err) {
      // Continue to next table
    }
  }

  // Test 4: Try different table names for projects
  const projTables = ['projects', 'project', 'portfolio', 'work', 'products'];
  for (const tableName of projTables) {
    try {
      const { data, error } = await supabase.from(tableName).select('*').limit(1);
      if (!error && data) {
        console.log(`✅ Found projects table: ${tableName}`);
        console.log('Sample data:', data);
        break;
      }
    } catch (err) {
      // Continue to next table
    }
  }

  console.log('🔍 Diagnostic complete!');
};
