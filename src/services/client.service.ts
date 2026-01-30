import { supabase } from '../lib/supabase';

export interface ClientRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  requirements?: string[];
}

export const clientService = {
  async createClientRequest(requestData: ClientRequest) {
    try {
      // First, let's try to check if the table exists by doing a simple query
      const { error: testError } = await supabase
        .from('client_requests')
        .select('id')
        .limit(1);

      // If table doesn't exist or other Supabase error, use fallback
      if (testError) {
        console.log('Supabase table error, using fallback storage:', testError.message);
        return this.createFallbackRequest(requestData);
      }

      // Try to insert the data
      const { data, error } = await supabase
        .from('client_requests')
        .insert([{
          ...requestData,
          status: 'pending',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating client request:', error);
        // Fallback to local storage if Supabase insert fails
        return this.createFallbackRequest(requestData);
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error creating client request:', error);
      // Final fallback
      return this.createFallbackRequest(requestData);
    }
  },

  async createFallbackRequest(requestData: ClientRequest) {
    try {
      // Store in localStorage as fallback
      const existingRequests = JSON.parse(localStorage.getItem('client_requests') || '[]');
      const newRequest = {
        id: Date.now().toString(),
        ...requestData,
        status: 'pending',
        created_at: new Date().toISOString(),
        source: 'fallback'
      };
      
      existingRequests.push(newRequest);
      localStorage.setItem('client_requests', JSON.stringify(existingRequests));

      console.log('Request stored in fallback storage:', newRequest);

      return {
        success: true,
        data: newRequest,
        fallback: true
      };
    } catch (error) {
      console.error('Fallback storage also failed:', error);
      return {
        success: false,
        error: 'Failed to submit request'
      };
    }
  },

  async getClientRequests() {
    try {
      // Try Supabase first
      const { data, error } = await supabase
        .from('client_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching from Supabase, trying fallback:', error);
        return this.getFallbackRequests();
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error fetching client requests:', error);
      return this.getFallbackRequests();
    }
  },

  async getUserClientRequests(userId: string, userEmail?: string) {
    try {
      // Try to fetch by user_id first
      const { data, error } = await supabase
        .from('client_requests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        // If the column doesn't exist, fall back to email-based lookup
        if (error.code === '42703' && userEmail) {
          const { data: byEmail, error: emailErr } = await supabase
            .from('client_requests')
            .select('*')
            .eq('email', userEmail)
            .order('created_at', { ascending: false });

          if (emailErr) {
            console.error('Error fetching client requests by email fallback:', emailErr);
            return this.getFallbackRequests();
          }

          return { success: true, data: byEmail || [] };
        }

        console.error('Error fetching user client requests:', error);
        return this.getFallbackRequests();
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error fetching user client requests:', error);
      return this.getFallbackRequests();
    }
  },

  async getFallbackRequests() {
    try {
      const requests = JSON.parse(localStorage.getItem('client_requests') || '[]');
      return {
        success: true,
        data: requests,
        fallback: true
      };
    } catch (error) {
      console.error('Error fetching fallback requests:', error);
      return {
        success: false,
        error: 'Failed to fetch requests'
      };
    }
  }
};
