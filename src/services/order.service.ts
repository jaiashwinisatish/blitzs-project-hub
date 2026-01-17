import { supabase } from '../lib/supabase';

export interface Order {
  id: string;
  user_id: string;
  project_id: string;
  user?: {
    id: string;
    full_name: string;
    email: string;
  };
  project?: {
    id: string;
    title: string;
    price: number;
    images: string[];
    category: string;
  };
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_id?: string;
  created_at: string;
  updated_at: string;
}

export const orderService = {
  async getUserOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          data: {
            orders: [],
            pagination: {
              currentPage: 1,
              totalPages: 0,
              totalOrders: 0,
              hasNext: false,
              hasPrev: false
            }
          }
        };
      }

      let query = supabase
        .from('orders')
        .select(`
          *,
          project:projects(id, title, price, images, category),
          user:profiles(id, full_name, email)
        `, { count: 'exact' })
        .eq('user_id', user.id);

      if (params?.status) {
        query = query.eq('status', params.status);
      }

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to).order('created_at', { ascending: false });

      const { data: orders, error, count } = await query;

      if (error) {
        throw error;
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return {
        success: true,
        data: {
          orders: orders || [],
          pagination: {
            currentPage: page,
            totalPages,
            totalOrders: count || 0,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          orders: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalOrders: 0,
            hasNext: false,
            hasPrev: false
          }
        }
      };
    }
  },

  async getOrderById(id: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated',
          data: null
        };
      }

      const { data: order, error } = await supabase
        .from('orders')
        .select(`
          *,
          project:projects(id, title, price, images, category),
          user:profiles(id, full_name, email)
        `)
        .eq('id', id)
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
          data: null
        };
      }

      // Check if user owns this order or is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (order.user_id !== user.id && profile?.role !== 'admin') {
        return {
          success: false,
          message: 'Access denied',
          data: null
        };
      }

      return {
        success: true,
        message: 'Order fetched successfully',
        data: order
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch order',
        data: null
      };
    }
  },

  // Admin only
  async getAllOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          project:projects(id, title, price, images, category),
          user:profiles(id, full_name, email)
        `, { count: 'exact' });

      if (params?.status) {
        query = query.eq('status', params.status);
      }

      if (params?.search) {
        query = query.or(`
          project.title.ilike.%${params.search}%,
          user.full_name.ilike.%${params.search}%,
          user.email.ilike.%${params.search}%
        `);
      }

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to).order('created_at', { ascending: false });

      const { data: orders, error, count } = await query;

      if (error) {
        throw error;
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return {
        success: true,
        data: {
          orders: orders || [],
          pagination: {
            currentPage: page,
            totalPages,
            totalOrders: count || 0,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          orders: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalOrders: 0,
            hasNext: false,
            hasPrev: false
          }
        }
      };
    }
  },

  async updateOrderStatus(orderId: string, status: string) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Order status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update order status'
      };
    }
  },

  async getOrderStats() {
    try {
      const [
        pendingCount,
        completedCount,
        failedCount,
        refundedCount,
        totalRevenue
      ] = await Promise.all([
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'failed'),
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'refunded'),
        supabase.from('orders').select('amount').eq('status', 'completed')
      ]);

      const revenue = totalRevenue.data?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;

      return {
        success: true,
        data: {
          pending: pendingCount.count || 0,
          completed: completedCount.count || 0,
          failed: failedCount.count || 0,
          refunded: refundedCount.count || 0,
          totalRevenue: revenue
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          pending: 0,
          completed: 0,
          failed: 0,
          refunded: 0,
          totalRevenue: 0
        }
      };
    }
  }
};
