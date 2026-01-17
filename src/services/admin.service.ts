import { supabase } from '../lib/supabase';

export interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalOrders: number;
  totalRequests: number;
  totalRevenue: number;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface ClientRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  project_type: string;
  budget: string;
  timeline: string;
  description: string;
  status: string;
  created_at: string;
}

export const adminService = {
  async getDashboardStats() {
    try {
      const [
        usersCount,
        projectsCount,
        ordersCount,
        requestsCount,
        ordersRevenue
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('client_requests').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('amount').eq('status', 'completed')
      ]);

      const totalRevenue = ordersRevenue.data?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;

      return {
        success: true,
        data: {
          totalUsers: usersCount.count || 0,
          totalProjects: projectsCount.count || 0,
          totalOrders: ordersCount.count || 0,
          totalRequests: requestsCount.count || 0,
          totalRevenue
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          totalUsers: 0,
          totalProjects: 0,
          totalOrders: 0,
          totalRequests: 0,
          totalRevenue: 0
        }
      };
    }
  },

  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }) {
    try {
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      if (params?.role) {
        query = query.eq('role', params.role);
      }

      if (params?.search) {
        query = query.or(`full_name.ilike.%${params.search}%,email.ilike.%${params.search}%`);
      }

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to).order('created_at', { ascending: false });

      const { data: users, error, count } = await query;

      if (error) {
        throw error;
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return {
        success: true,
        data: {
          users: users || [],
          pagination: {
            currentPage: page,
            totalPages,
            totalUsers: count || 0,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          users: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalUsers: 0,
            hasNext: false,
            hasPrev: false
          }
        }
      };
    }
  },

  async updateUserRole(userId: string, role: string) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'User role updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user role'
      };
    }
  },

  async toggleUserStatus(userId: string) {
    try {
      const { data: user } = await supabase
        .from('profiles')
        .select('is_active')
        .eq('id', userId)
        .single();

      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      const { error } = await supabase
        .from('profiles')
        .update({ is_active: !user.is_active })
        .eq('id', userId);

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'User status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user status'
      };
    }
  },

  async getAllProjectsAdmin(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
  }) {
    try {
      let query = supabase
        .from('projects')
        .select(`
          *,
          added_by:profiles(id, full_name)
        `, { count: 'exact' });

      if (params?.category) {
        query = query.eq('category', params.category);
      }

      if (params?.status === 'published') {
        query = query.eq('is_published', true);
      } else if (params?.status === 'draft') {
        query = query.eq('is_published', false);
      }

      if (params?.search) {
        query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%`);
      }

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to).order('created_at', { ascending: false });

      const { data: projects, error, count } = await query;

      if (error) {
        throw error;
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return {
        success: true,
        data: {
          projects: projects || [],
          pagination: {
            currentPage: page,
            totalPages,
            totalProjects: count || 0,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          projects: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalProjects: 0,
            hasNext: false,
            hasPrev: false
          }
        }
      };
    }
  },

  async getAllClientRequests(params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    search?: string;
  }) {
    try {
      let query = supabase
        .from('client_requests')
        .select('*', { count: 'exact' });

      if (params?.status) {
        query = query.eq('status', params.status);
      }

      if (params?.search) {
        query = query.or(`name.ilike.%${params.search}%,email.ilike.%${params.search}%,description.ilike.%${params.search}%`);
      }

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to).order('created_at', { ascending: false });

      const { data: requests, error, count } = await query;

      if (error) {
        throw error;
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return {
        success: true,
        data: {
          requests: requests || [],
          pagination: {
            currentPage: page,
            totalPages,
            totalRequests: count || 0,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          requests: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalRequests: 0,
            hasNext: false,
            hasPrev: false
          }
        }
      };
    }
  },

  async updateRequestStatus(requestId: string, data: {
    status: string;
    notes?: string;
    estimatedCost?: number;
    estimatedTimeline?: string;
  }) {
    try {
      const { error } = await supabase
        .from('client_requests')
        .update({
          status: data.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Request status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update request status'
      };
    }
  },

  async addDeveloper(data: any) {
    try {
      const { data: developer, error } = await supabase
        .from('developers')
        .insert(data)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Developer added successfully',
        data: developer
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add developer'
      };
    }
  },

  async updateDeveloper(developerId: string, data: any) {
    try {
      const { data: developer, error } = await supabase
        .from('developers')
        .update(data)
        .eq('id', developerId)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Developer updated successfully',
        data: developer
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update developer'
      };
    }
  },

  async deleteDeveloper(developerId: string) {
    try {
      const { error } = await supabase
        .from('developers')
        .delete()
        .eq('id', developerId);

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Developer deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete developer'
      };
    }
  },

  async getAllDevelopers() {
    try {
      const { data: developers, error } = await supabase
        .from('developers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return {
          success: false,
          message: error.message,
          data: []
        };
      }

      return {
        success: true,
        data: developers || []
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch developers',
        data: []
      };
    }
  }
};
