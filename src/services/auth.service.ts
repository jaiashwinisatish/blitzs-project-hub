import { supabase } from '../lib/supabase';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: string;
      avatar?: string;
      purchasedProjects: string[];
      orders: string[];
      clientRequests: string[];
      createdAt: string;
    };
    token: string;
  };
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        return {
          success: false,
          message: error.message,
          data: { user: null, token: '' }
        };
      }

      // Get user profile from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      }

      const user = {
        id: authData.user.id,
        fullName: profile?.full_name || authData.user.email?.split('@')[0] || 'User',
        email: authData.user.email!,
        role: profile?.role || 'user',
        avatar: profile?.avatar || '',
        purchasedProjects: profile?.purchased_projects || [],
        orders: profile?.orders || [],
        clientRequests: profile?.client_requests || [],
        createdAt: authData.user.created_at
      };

      return {
        success: true,
        message: 'Login successful',
        data: { user, token: authData.session?.access_token || '' }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Login failed',
        data: { user: null, token: '' }
      };
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName
          }
        }
      });

      if (error) {
        return {
          success: false,
          message: error.message,
          data: { user: null, token: '' }
        };
      }

      if (!authData.user) {
        return {
          success: false,
          message: 'Registration failed',
          data: { user: null, token: '' }
        };
      }

      // Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: data.fullName,
          email: data.email,
          role: 'user'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }

      const user = {
        id: authData.user.id,
        fullName: data.fullName,
        email: data.email,
        role: 'user',
        avatar: '',
        purchasedProjects: [],
        orders: [],
        clientRequests: [],
        createdAt: authData.user.created_at
      };

      return {
        success: true,
        message: 'Registration successful',
        data: { user, token: authData.session?.access_token || '' }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Registration failed',
        data: { user: null, token: '' }
      };
    }
  },

  async getProfile() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return {
          success: false,
          message: 'Not authenticated',
          data: { user: null }
        };
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      }

      const userData = {
        id: user.id,
        fullName: profile?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email!,
        role: profile?.role || 'user',
        avatar: profile?.avatar || '',
        purchasedProjects: profile?.purchased_projects || [],
        orders: profile?.orders || [],
        clientRequests: profile?.client_requests || [],
        createdAt: user.created_at
      };

      return {
        success: true,
        message: 'Profile fetched successfully',
        data: { user: userData }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch profile',
        data: { user: null }
      };
    }
  },

  async updateProfile(data: { fullName?: string; avatar?: string }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      const updateData: any = {};
      if (data.fullName) updateData.full_name = data.fullName;
      if (data.avatar) updateData.avatar = data.avatar;

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update profile'
      };
    }
  },

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Password updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update password'
      };
    }
  },

  async logout() {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('user');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  getToken() {
    return localStorage.getItem('supabase.auth.token');
  },

  setToken(token: string) {
    localStorage.setItem('supabase.auth.token', token);
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      return false;
    }
  },

  async isAdmin(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      return profile?.role === 'admin';
    } catch (error) {
      return false;
    }
  }
};
