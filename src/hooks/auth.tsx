import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import { useToast } from './toast';

type AuthState = {
  token: string;
  user: object;
};
type Auth = {
  email: string;
  password: string;
};
interface AuthContextDate {
  user: object;
  signIn(data: Auth): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextDate>({} as AuthContextDate);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Gobaber:token');
    const user = localStorage.getItem('@Gobaber:user');
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }
    return {} as AuthState;
  });
  const { addToast } = useToast();
  const signIn = useCallback(
    async ({ email, password }) => {
      try {
        const response = await api.post('/sessions', {
          email,
          password,
        });

        const { token, userAuthenticate: user } = response.data;

        localStorage.setItem('@Gobaber:token', token);
        localStorage.setItem('@Gobaber:user', JSON.stringify(user));

        setData({ token, user });
      } catch (err) {
        addToast({
          title: 'Falha em fazer login',
          description: 'Login invalido, verifique suas crendencias',
          type: 'error',
        });
      }
    },
    [addToast],
  );
  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobaber:token');
    localStorage.removeItem('@Gobaber:user');
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextDate {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
