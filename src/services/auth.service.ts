import { supabase } from '../lib/supabase';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  avatar?: string;
  avatar_path?: string;
  created_at?: string;
}

export interface AuthResponse {
  user: User | null;
  session: any | null;
  error: Error | null;
}

export const authService = {
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          user: null,
          session: null,
          error
        };
      }

      const user: User | null = data.user ? {
        id: data.user.id,
        email: data.user.email!,
        full_name: data.user.user_metadata?.full_name,
        role: data.user.user_metadata?.role || 'user',
        avatar: data.user.user_metadata?.avatar,
        avatar_path: data.user.user_metadata?.avatar_path,
        created_at: data.user.created_at
      } : null;

      return {
        user,
        session: data.session,
        error: null
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: error as Error
      };
    }
  },

  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'user'
          }
        }
      });

      if (error) {
        return {
          user: null,
          session: null,
          error
        };
      }

      const user: User | null = data.user ? {
        id: data.user.id,
        email: data.user.email!,
        full_name: data.user.user_metadata?.full_name,
        role: data.user.user_metadata?.role || 'user',
        avatar: data.user.user_metadata?.avatar,
        avatar_path: data.user.user_metadata?.avatar_path,
        created_at: data.user.created_at
      } : null;

      return {
        user,
        session: data.session,
        error: null
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: error as Error
      };
    }
  },

  async signOut(): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  },

  async getCurrentUser(): Promise<{ user: User | null; error: Error | null }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        return {
          user: null,
          error
        };
      }

      const userData: User | null = user ? {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name,
        role: user.user_metadata?.role || 'user',
        avatar: user.user_metadata?.avatar,
        avatar_path: user.user_metadata?.avatar_path,
        created_at: user.created_at
      } : null;

      return {
        user: userData,
        error: null
      };
    } catch (error) {
      return {
        user: null,
        error: error as Error
      };
    }
  },

  async updateProfile(userData: Partial<User>): Promise<{ user: User | null; error: Error | null }> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: userData.full_name,
          avatar: userData.avatar,
          avatar_path: (userData as any).avatar_path
        }
      });

      if (error) {
        return {
          user: null,
          error
        };
      }

      const updatedUser: User | null = data.user ? {
        id: data.user.id,
        email: data.user.email!,
        full_name: data.user.user_metadata?.full_name,
        role: data.user.user_metadata?.role || 'user',
        avatar: data.user.user_metadata?.avatar,
        created_at: data.user.created_at
      } : null;

      return {
        user: updatedUser,
        error: null
      };
    } catch (error) {
      return {
        user: null,
        error: error as Error
      };
    }
  },

  async resetPassword(email: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      const user: User | null = session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        full_name: session.user.user_metadata?.full_name,
        role: session.user.user_metadata?.role || 'user',
        avatar: session.user.user_metadata?.avatar,
        created_at: session.user.created_at
      } : null;

      callback(user);
    });
  }
};
