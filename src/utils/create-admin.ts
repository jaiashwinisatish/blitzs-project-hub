import { supabase } from '@/lib/supabase';

export const createFirstAdmin = async (email: string, password: string, fullName: string) => {
  try {
    console.log('Starting admin creation for:', email);
    
    // Create the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (signUpError) {
      console.error('Sign up error:', signUpError);
      return { success: false, message: signUpError.message };
    }

    if (!authData.user) {
      return { success: false, message: 'Failed to create user' };
    }

    console.log('User created successfully:', authData.user.id);

    // Wait a moment for the trigger to create the profile
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Try to update the profile to admin role using service role
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', authData.user.id);

    if (profileError) {
      console.error('Profile update error:', profileError);
      
      // If RLS is blocking, try direct SQL
      try {
        const { error: sqlError } = await supabase.rpc('set_admin_role', {
          user_id: authData.user.id
        });
        
        if (sqlError) {
          console.error('SQL RPC error:', sqlError);
          return { success: false, message: `Profile update failed: ${profileError.message}. SQL RPC failed: ${sqlError.message}` };
        }
      } catch (rpcError) {
        console.error('RPC call failed:', rpcError);
        return { success: false, message: `Profile update failed: ${profileError.message}. Please manually set role to 'admin' in Supabase dashboard.` };
      }
    }

    console.log('Admin role set successfully');
    
    return { 
      success: true, 
      message: 'Admin user created successfully. Please check your email to verify your account.' 
    };
  } catch (error) {
    console.error('Create admin error:', error);
    return { success: false, message: 'Failed to create admin user: ' + error.message };
  }
};

// Alternative method to manually set admin role
export const setAdminRole = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userId);
    
    if (error) {
      return { success: false, message: error.message };
    }
    
    return { success: true, message: 'Admin role set successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to set admin role' };
  }
};
