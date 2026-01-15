import api from '../lib/api';

export interface Order {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
  };
  project: {
    _id: string;
    title: string;
    price: number;
    images: string[];
    category: string;
  };
  orderNumber: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  isPaid: boolean;
  paidAt?: string;
  downloadCount: number;
  maxDownloads: number;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  async getUserOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    const response = await api.get('/orders/user', { params });
    return response.data;
  },

  async getOrderById(id: string) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Admin only
  async getAllOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  async updateOrderStatus(orderId: string, status: string) {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  async getOrderStats() {
    const response = await api.get('/orders/stats');
    return response.data;
  }
};
