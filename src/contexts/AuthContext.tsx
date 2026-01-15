import React, { createContext, useContext, useEffect, useState } from 'react';
<<<<<<< HEAD
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
=======
import { authService } from '@/services/auth.service';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
  purchasedProjects: string[];
  orders: string[];
  clientRequests: string[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
>>>>>>> 8457b0d (Merged local code with GitHub repo)
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
<<<<<<< HEAD
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Use setTimeout to avoid blocking the auth callback
          setTimeout(async () => {
            const adminStatus = await checkAdminRole(session.user.id);
            setIsAdmin(adminStatus);
          }, 0);
        } else {
          setIsAdmin(false);
        }

        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const adminStatus = await checkAdminRole(session.user.id);
        setIsAdmin(adminStatus);
      }

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
=======
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = authService.getToken();
        const storedUser = authService.getUser();

        if (token && storedUser) {
          setUser(storedUser);
          setIsAdmin(storedUser.role === 'admin');
          
          // Verify token is still valid by fetching fresh profile
          try {
            const response = await authService.getProfile();
            if (response.success) {
              setUser(response.data.user);
              authService.setUser(response.data.user);
              setIsAdmin(response.data.user.role === 'admin');
            }
          } catch (error) {
            // Token invalid, clear storage
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
>>>>>>> 8457b0d (Merged local code with GitHub repo)
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
<<<<<<< HEAD
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: fullName,
          },
        },
      });

      return { error: error as Error | null };
    } catch (error) {
      return { error: error as Error };
=======
      const response = await authService.register({ fullName, email, password });
      
      if (response.success) {
        setUser(response.data.user);
        authService.setToken(response.data.token);
        authService.setUser(response.data.user);
        setIsAdmin(response.data.user.role === 'admin');
      }
      
      return { error: null };
    } catch (error: any) {
      return { error: error.response?.data?.message || error.message };
>>>>>>> 8457b0d (Merged local code with GitHub repo)
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
<<<<<<< HEAD
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error: error as Error | null };
    } catch (error) {
      return { error: error as Error };
=======
      const response = await authService.login({ email, password });
      
      if (response.success) {
        setUser(response.data.user);
        authService.setToken(response.data.token);
        authService.setUser(response.data.user);
        setIsAdmin(response.data.user.role === 'admin');
      }
      
      return { error: null };
    } catch (error: any) {
      return { error: error.response?.data?.message || error.message };
>>>>>>> 8457b0d (Merged local code with GitHub repo)
    }
  };

  const signOut = async () => {
<<<<<<< HEAD
    await supabase.auth.signOut();
=======
    authService.logout();
    setUser(null);
>>>>>>> 8457b0d (Merged local code with GitHub repo)
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
<<<<<<< HEAD
        session,
=======
>>>>>>> 8457b0d (Merged local code with GitHub repo)
        isLoading,
        isAdmin,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
