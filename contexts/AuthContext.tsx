import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface UserData {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (token: string, userData: UserData) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const [token, storedUserData] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('userData')
      ]);

      if (token && storedUserData) {
        setIsAuthenticated(true);
        setUserData(JSON.parse(storedUserData));
      } else {
        await AsyncStorage.multiRemove(['token', 'userData']);
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      await AsyncStorage.multiRemove(['token', 'userData']);
      setIsAuthenticated(false);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (token: string, userData: UserData) => {
    try {
      await AsyncStorage.multiSet([
        ['token', token],
        ['userData', JSON.stringify(userData)]
      ]);
      setIsAuthenticated(true);
      setUserData(userData);
      router.replace('/(protected)/silos/painel-silo');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'userData']);
      setIsAuthenticated(false);
      setUserData(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userData, 
      login, 
      logout, 
      isLoading,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};