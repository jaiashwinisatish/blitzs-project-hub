import { createClient } from '@supabase/supabase-js';

// Test Supabase connection
const supabase = createClient(
  'https://afgromdzethkscaskofz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZ3JvbWR6ZXRoZ3Nrc2Fza29meiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzA4NzI4NzAwLCJleHAiOjIwMjQzMDQ3MDB9.3Qk4mYVjZkT2Q8Y3n4X7wP6qL8vR9zX1K2mN8o3dF4'
);

export const testConnection = async () => {
  console.log('Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1);
    console.log('Basic connection test:', { data, error });
  } catch (err) {
    console.log('Connection error:', err);
  }

  try {
    // List all tables
    const { data, error } = await supabase.rpc('get_table_info');
    console.log('Tables info:', { data, error });
  } catch (err) {
    console.log('Tables info error:', err);
  }

  try {
    // Try to get developers without filters
    const { data, error } = await supabase.from('developers').select('*').limit(5);
    console.log('Developers (no filter):', { data, error });
  } catch (err) {
    console.log('Developers error:', err);
  }

  try {
    // Try to get projects without filters
    const { data, error } = await supabase.from('projects').select('*').limit(5);
    console.log('Projects (no filter):', { data, error });
  } catch (err) {
    console.log('Projects error:', err);
  }

  try {
    // Check if tables exist with different names
    const { data, error } = await supabase.from('team').select('*').limit(5);
    console.log('Team table:', { data, error });
  } catch (err) {
    console.log('Team table error:', err);
  }

  try {
    const { data, error } = await supabase.from('project').select('*').limit(5);
    console.log('Project table (singular):', { data, error });
  } catch (err) {
    console.log('Project table error:', err);
  }
};
