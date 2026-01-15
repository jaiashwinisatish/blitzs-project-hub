import api from '../lib/api';

export interface ClientRequestData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string; // This will be mapped to project_type in the controller
  budget: string;
  timeline: string;
  description: string;
  requirements?: string[];
}

export const clientService = {
  async createClientRequest(data: ClientRequestData) {
    const response = await api.post('/clients', data);
    return response.data;
  },

  async getUserClientRequests(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    const response = await api.get('/clients/user', { params });
    return response.data;
  },

  async getClientRequestById(id: string) {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  }
};
