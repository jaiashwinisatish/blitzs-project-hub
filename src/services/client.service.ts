import api from '../lib/api';

export interface ClientRequest {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  requirements: string[];
}

export const clientService = {
  async createClientRequest(requestData: ClientRequest) {
    try {
      const response = await api.post('/contact', requestData);
      return response.data;
    } catch (error) {
      console.error('Error creating client request:', error);
      return {
        success: false,
        message: 'Failed to submit request'
      };
    }
  },

  async getClientRequests() {
    try {
      const response = await api.get('/contact/requests');
      return response.data;
    } catch (error) {
      console.error('Error fetching client requests:', error);
      return {
        success: false,
        message: 'Failed to fetch requests'
      };
    }
  }
};
