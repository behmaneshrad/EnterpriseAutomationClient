"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession, signOut } from "next-auth/react";


// تایپ داده های توکن
interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
}

// تایپ داده های کاربر
interface UserProfileType {
  id: string;
  name?: string | null;
  email?: string | null;
  roles: string[];
}
// ساختار کانتکست
interface AuthContextType {
  user: UserProfileType | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    console.log("Session object:", session);
    if (status === "authenticated" && session?.user) {
      const newUser = { 
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        roles: session.user.roles,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } else if (status === "unauthenticated") {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, [status, session]);

  const tokens: AuthTokens = {
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
    idToken: session?.idToken,
  };

  const logout = () => signOut({ callbackUrl: "/login" });

  const isAuthenticated = status === "authenticated";

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
