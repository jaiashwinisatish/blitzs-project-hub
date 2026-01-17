import { supabase } from '../lib/supabase';

export interface ClientRequestData {
  name: string;
  email: string;
  phone?: string;
  project_type: string;
  budget: string;
  timeline: string;
  description: string;
}

export const clientService = {
  async createClientRequest(data: ClientRequestData) {
    try {
      const { data: request, error } = await supabase
        .from('client_requests')
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
        message: 'Client request created successfully',
        data: request
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create client request'
      };
    }
  },

  async getUserClientRequests(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    try {
      let query = supabase
        .from('client_requests')
        .select('*', { count: 'exact' });

      if (params?.status) {
        query = query.eq('status', params.status);
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

  async getClientRequestById(id: string) {
    try {
      const { data: request, error } = await supabase
        .from('client_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
          data: null
        };
      }

      return {
        success: true,
        message: 'Client request fetched successfully',
        data: request
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch client request',
        data: null
      };
    }
  }
};
