"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession, signOut } from "next-auth/react";

// توکن ها
interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
}

// اطلاعات کاربر 
interface UserProfileType {
  id: string;
  name?: string | null;
  email?: string | null;
  roles: string[];
}
// context ساختار 
interface AuthContextType {
  user: UserProfileType | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProfileType | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localstorage:", error);
    }
  }, []);

    
  useEffect(() => {
    console.log("Session object:", session);
    if (status === "authenticated" && session?.user) {
      const newUser: UserProfileType = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        roles: session.user.roles,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } 
  }, [status, session, user]);

  const tokens: AuthTokens | null =
    status === "authenticated"
      ? {
          accessToken: session?.accessToken,
          refreshToken: session?.refreshToken,
          idToken: session?.idToken,
        }
      : null;

  const logout = () => signOut({ callbackUrl: "/login" });

  const isAuthenticated = !!tokens?.accessToken; 

  return (
    <AuthContext.Provider value={{ user, tokens, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
