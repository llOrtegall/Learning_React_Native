import { verifyTokenUser } from '@/services/auth';
import { UserInfo } from '@/types/Interfaces';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  userToken: string | null;
  signIn: (token: string) => Promise<boolean>;
  signOut: () => void;
  loading: boolean;
  user: UserInfo | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getItemAsync('token');
      setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const signIn = async (token: string) => {
    try {
      const user = await verifyTokenUser(token);

      if (user) {
        setUser(user);
        await setItemAsync('token', token);
        setUserToken(token);
        return true;
      }

      return false;
    } catch (e) {
      console.error('Error during signIn:', e);
      return false;
    }
  };

  const signOut = async () => {
    await deleteItemAsync('token');
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
