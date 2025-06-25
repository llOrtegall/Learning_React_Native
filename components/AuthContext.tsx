import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  userToken: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getItemAsync('token');
      setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      // Cambia la URL por la de tu backend
      const response = await fetch('http://172.20.1.70:3001/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) return false;
      const data = await response.json();
      if (data.token) {
        await setItemAsync('token', data.token);
        setUserToken(data.token);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const signOut = async () => {
    await deleteItemAsync('token');
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
