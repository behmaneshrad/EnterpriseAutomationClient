"use client";

import {useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// تایپ داده های کاربر 
interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string;
  roles?: string[];
}

// تایپ داده های توکن
interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
}

// اینترفیس برای تعریف ساختار کانتکست
interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {data: session, status} = useSession();
  const [initialUserData, setInitialUserData] = useState<User | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // فقط در اولین لاگین اطلاعات ذخیره شود
      if (!localStorage.getItem('user')) {
      const userData = {
        name: session.user.name,
        email: session.user.email,
      };
      localStorage.setItem('user', JSON.stringify(userData));
    }
    setInitialUserData(session.user as User);
    } else if (status === 'unauthenticated') {
      //را پاک میکنیم localstorage کرده  Logout  اگر کاربر
      localStorage.removeItem('user');
      setInitialUserData(null);
    }
}, [status, session]);

  const logout = () => {
    signOut({callbackUrl: '/login'});
  }

  const tokens = {
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
    idToken: session?.idToken,
  };

  const user = initialUserData || session?.user || null;
  const isAuthenticated = status === 'authenticated';

  return (
    <AuthContext.Provider value={{user, tokens, isAuthenticated, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
