import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for existing session on mount
    const token = authService.getToken();
    const userData = authService.getUser();
    
    if (token && userData) {
      setUser(userData);
      setIsAdmin(authService.isAdmin());
    }
    
    setIsLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const response = await authService.register({
        email,
        password,
        fullName
      });

      if (response.success) {
        setUser(response.data.user);
        authService.setToken(response.data.token);
        authService.setUser(response.data.user);
        setIsAdmin(response.data.user.role === 'admin');
      }

      return { error: response.success ? null : new Error(response.message) };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login({
        email,
        password
      });

      if (response.success) {
        setUser(response.data.user);
        authService.setToken(response.data.token);
        authService.setUser(response.data.user);
        setIsAdmin(response.data.user.role === 'admin');
      }

      return { error: response.success ? null : new Error(response.message) };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    authService.logout();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
