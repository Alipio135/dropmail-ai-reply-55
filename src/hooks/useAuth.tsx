
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  name?: string;
  isGmailConnected: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  connectGmail: () => Promise<void>;
  disconnectGmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('dropmail_user');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        email,
        name: email.split('@')[0],
        isGmailConnected: false
      };
      
      setUser(userData);
      localStorage.setItem('dropmail_user', JSON.stringify(userData));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        email: 'user@example.com',
        name: 'Demo User',
        isGmailConnected: false
      };
      
      setUser(userData);
      localStorage.setItem('dropmail_user', JSON.stringify(userData));
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dropmail_user');
    navigate('/login');
  };

  const connectGmail = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, isGmailConnected: true };
        setUser(updatedUser);
        localStorage.setItem('dropmail_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Connect Gmail error:', error);
      throw error;
    }
  };

  const disconnectGmail = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, isGmailConnected: false };
        setUser(updatedUser);
        localStorage.setItem('dropmail_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Disconnect Gmail error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login,
      loginWithGoogle,
      logout,
      connectGmail,
      disconnectGmail
    }}>
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
