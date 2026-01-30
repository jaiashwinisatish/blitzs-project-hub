import { supabase } from '../lib/supabase';

export interface Developer {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar_url?: string;
  github_url?: string;
  linkedin_url?: string;
  skills: string[];
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
  role?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalDevelopers: number;
  totalPurchases: number;
  totalRevenue: number;
  recentActivity: any[];
}

export const adminService = {
  // Get all developers (admin only)
  getAllDevelopers: async () => {
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || []
      };
    } catch (error: any) {
      console.error('Error fetching developers:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch developers'
      };
    }
  },

  // Get dashboard statistics (admin only)
  getDashboardStats: async (): Promise<{ success: boolean; data?: DashboardStats; message?: string }> => {
    try {
      // Get user count
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (userError) throw userError;

      // Get project count
      const { count: projectCount, error: projectError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      if (projectError) throw projectError;

      // Get developer count
      const { count: developerCount, error: developerError } = await supabase
        .from('developers')
        .select('*', { count: 'exact', head: true });

      if (developerError) throw developerError;

      // Get purchase count and revenue
      const { data: purchases, error: purchaseError } = await supabase
        .from('purchases')
        .select('amount');

      if (purchaseError) throw purchaseError;

      const totalPurchases = purchases?.length || 0;
      const totalRevenue = purchases?.reduce((sum, purchase) => {
        return sum + (purchase.amount || 0);
      }, 0) || 0;

      const stats: DashboardStats = {
        totalUsers: userCount || 0,
        totalProjects: projectCount || 0,
        totalDevelopers: developerCount || 0,
        totalPurchases,
        totalRevenue,
        recentActivity: []
      };

      return {
        success: true,
        data: stats
      };
    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch dashboard stats'
      };
    }
  },

  // Get all users with pagination and filtering (admin only)
  getAllUsers: async (options?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }) => {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 20;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('profiles')
        .select(`
          *,
          user_roles!inner(role)
        `)
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      if (options?.search) {
        query = query.ilike('full_name', `%${options.search}%`);
      }

      if (options?.role && options.role !== 'all') {
        query = query.eq('user_roles.role', options.role);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error: any) {
      console.error('Error fetching users:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch users'
      };
    }
  },

  // Update user role (admin only)
  updateUserRole: async (userId: string, role: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data
      };
    } catch (error: any) {
      console.error('Error updating user role:', error);
      return {
        success: false,
        message: error.message || 'Failed to update user role'
      };
    }
  },

  // Get all projects with pagination and filtering (admin only)
  getAllProjects: async (options?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
  }) => {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 20;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('projects')
        .select(`
          *,
          profiles!added_by(full_name)
        `)
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      if (options?.search) {
        query = query.ilike('title', `%${options.search}%`);
      }

      if (options?.category && options.category !== 'all') {
        query = query.eq('category', options.category);
      }

      if (options?.status) {
        query = query.eq('is_published', options.status === 'published');
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch projects'
      };
    }
  },

  // Get all client requests (admin only)
  getAllClientRequests: async (options?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    priority?: string;
  }) => {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 20;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('client_requests')
        .select('*')
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      if (options?.search) {
        query = query.ilike('name', `%${options.search}%`);
      }

      if (options?.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      }

      if (options?.priority && options.priority !== 'all') {
        query = query.eq('priority', options.priority);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error: any) {
      console.error('Error fetching client requests:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch client requests'
      };
    }
  },

  // Update request status (admin only)
  updateRequestStatus: async (requestId: string, updateData: any) => {
    try {
      const { data, error } = await supabase
        .from('client_requests')
        .update(updateData)
        .eq('id', requestId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data
      };
    } catch (error: any) {
      console.error('Error updating request status:', error);
      return {
        success: false,
        message: error.message || 'Failed to update request status'
      };
    }
  },

  // Add developer (admin only)
  addDeveloper: async (developerData: Omit<Developer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('developers')
        .insert(developerData)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data
      };
    } catch (error: any) {
      console.error('Error adding developer:', error);
      return {
        success: false,
        message: error.message || 'Failed to add developer'
      };
    }
  },

  // Update developer (admin only)
  updateDeveloper: async (developerId: string, updateData: Partial<Developer>) => {
    try {
      const { data, error } = await supabase
        .from('developers')
        .update(updateData)
        .eq('id', developerId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data
      };
    } catch (error: any) {
      console.error('Error updating developer:', error);
      return {
        success: false,
        message: error.message || 'Failed to update developer'
      };
    }
  },

  // Delete developer (admin only)
  deleteDeveloper: async (developerId: string) => {
    try {
      const { error } = await supabase
        .from('developers')
        .delete()
        .eq('id', developerId);

      if (error) throw error;

      return {
        success: true
      };
    } catch (error: any) {
      console.error('Error deleting developer:', error);
      return {
        success: false,
        message: error.message || 'Failed to delete developer'
      };
    }
  }
};
