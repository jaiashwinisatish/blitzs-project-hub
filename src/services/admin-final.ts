import { createClient } from '@supabase/supabase-js';

// Correct Supabase client with proper API key
const supabase = createClient(
  'https://afgromdzethkscaskofz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZ3JvbWR6ZXRoZ3Nrc2Fza29meiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzA4NzI4NzAwLCJleHAiOjIwMjQzMDQ3MDB9.3Qk4mYVjZkT2Q8Y3n4X7wP6qL8vR9zX1K2mN8o3dF4'
);

export const adminService = {
  getAllDevelopers: async () => {
    console.log('Fetching developers from Supabase...');
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .eq('is_active', true);

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Error fetching developers:', error);
        throw error;
      }

      console.log('Developers found:', data?.length || 0);
      return {
        success: true,
        data: {
          developers: data || []
        }
      };
    } catch (error) {
      console.error('Error fetching developers:', error);
      throw error;
    }
  },

  addDeveloper: async (developerData: any) => {
    try {
      const { data, error } = await supabase
        .from('developers')
        .insert([{
          ...developerData,
          isActive: true,
          createdAt: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding developer:', error);
        throw error;
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error adding developer:', error);
      throw error;
    }
  },

  updateDeveloper: async (id: string, developerData: any) => {
    try {
      const { data, error } = await supabase
        .from('developers')
        .update({
          ...developerData,
          updatedAt: new Date().toISOString()
        })
        .eq('_id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating developer:', error);
        throw error;
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error updating developer:', error);
      throw error;
    }
  },

  deleteDeveloper: async (id: string) => {
    try {
      const { error } = await supabase
        .from('developers')
        .delete()
        .eq('_id', id);

      if (error) {
        console.error('Error deleting developer:', error);
        throw error;
      }

      return {
        success: true,
        message: 'Developer deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting developer:', error);
      throw error;
    }
  }
};
