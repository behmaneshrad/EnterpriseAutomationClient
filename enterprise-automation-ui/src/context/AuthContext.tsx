"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

//اینترفیس برای تعریف ساختار داده های کاربر
interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string;
}

// اینترفیس برای تعریف ساختار داده های توکن
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
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTokens = localStorage.getItem("tokens");

    if (storedUser && storedTokens) {
      setUser(JSON.parse(storedUser));
      setTokens(JSON.parse(storedTokens));
      setIsAuthenticated(true);
    }
  }, []);
  //   تابع  login برای ذخیره اطلاعات و بروزرسانی state
  const login = (userData: User, authTokens: AuthTokens) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("tokens", JSON.stringify(authTokens));
    setUser(userData);
    setTokens(authTokens);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
    setUser(null);
    setTokens(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, tokens, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
