import { supabase } from '../lib/supabase';

export const adminService = {
  getAllDevelopers: async () => {
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .eq('isActive', true);

      if (error) {
        console.error('Error fetching developers:', error);
        throw error;
      }

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
