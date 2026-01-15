import { supabase } from '../config/supabase.js';

class User {
  static async create(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          full_name: userData.fullName,
          email: userData.email,
          password: userData.password, // Will be hashed by auth controller
          role: userData.role || 'user',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating user:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in User.create:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error finding user by email:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in User.findByEmail:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, role, avatar, created_at, updated_at')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error finding user by ID:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in User.findById:', error);
      throw error;
    }
  }

  static async updateProfile(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          full_name: updateData.fullName,
          avatar: updateData.avatar,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in User.updateProfile:', error);
      throw error;
    }
  }

  static async getAll(page = 1, limit = 20, search = '', role = '') {
    try {
      let query = supabase
        .from('users')
        .select('id, full_name, email, role, created_at')
        .order('created_at', { ascending: false });

      if (role && role !== 'all') {
        query = query.eq('role', role);
      }

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      // Get total count first
      const { count: totalCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Get paginated results
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error } = await query.range(from, to);

      if (error) {
        console.error('Error getting all users:', error);
        throw new Error(error.message);
      }

      return {
        users: data || [],
        totalCount: totalCount || 0,
        page,
        limit,
        totalPages: Math.ceil((totalCount || 0) / limit)
      };
    } catch (error) {
      console.error('Error in User.getAll:', error);
      throw error;
    }
  }

  static async toggleStatus(id, isActive) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ 
          is_active: isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error toggling user status:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in User.toggleStatus:', error);
      throw error;
    }
  }

  static async updateRole(id, role) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ 
          role,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating user role:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in User.updateRole:', error);
      throw error;
    }
  }
}

export default User;
