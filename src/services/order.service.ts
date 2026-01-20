import api from '../lib/api';

export interface Order {
  _id: string;
  userId: string;
  projectId: string;
  amount: number;
  status: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  async createOrder(orderData: Partial<Order>) {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        message: 'Failed to create order'
      };
    }
  },

  async getUserOrders(userId: string) {
    try {
      const response = await api.get(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return {
        success: false,
        message: 'Failed to fetch orders'
      };
    }
  },

  async getAllOrders() {
    try {
      const response = await api.get('/admin/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      return {
        success: false,
        message: 'Failed to fetch orders'
      };
    }
  },

  async updateOrderStatus(orderId: string, status: string) {
    try {
      const response = await api.put(`/admin/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      return {
        success: false,
        message: 'Failed to update order status'
      };
    }
  }
};
