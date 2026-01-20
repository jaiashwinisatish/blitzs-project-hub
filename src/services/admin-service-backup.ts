import { createClient } from '@supabase/supabase-js';

// Direct Supabase client with correct URL
const supabase = createClient(
  'https://afgromdzethkscaskofz.supabase.co',
  'sb_publishable_uc-Q0_9szmdqnrMPE0-QGQ_Og9mhzx4'
);

export const adminService = {
  getAllDevelopers: async () => {
    console.log('Fetching developers from Supabase...');
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .eq('isActive', true);

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
