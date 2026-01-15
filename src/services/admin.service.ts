import api from '../lib/api';

export interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalOrders: number;
  totalRequests: number;
  totalRevenue: number;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface ClientRequest {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  status: string;
  priority: string;
  estimatedCost?: number;
  estimatedTimeline?: string;
  createdAt: string;
}

export const adminService = {
  async getDashboardStats() {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }) {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  async updateUserRole(userId: string, role: string) {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  async toggleUserStatus(userId: string) {
    const response = await api.put(`/admin/users/${userId}/toggle-status`);
    return response.data;
  },

  async getAllProjectsAdmin(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
  }) {
    const response = await api.get('/admin/projects', { params });
    return response.data;
  },

  async getAllClientRequests(params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    search?: string;
  }) {
    const response = await api.get('/admin/requests', { params });
    return response.data;
  },

  async updateRequestStatus(requestId: string, data: {
    status: string;
    notes?: string;
    estimatedCost?: number;
    estimatedTimeline?: string;
  }) {
    const response = await api.put(`/admin/requests/${requestId}/status`, data);
    return response.data;
  },

  async addDeveloper(data: any) {
    const response = await api.post('/admin/developers', data);
    return response.data;
  },

  async getAllDevelopers() {
    const response = await api.get('/admin/developers');
    return response.data;
  }
};
