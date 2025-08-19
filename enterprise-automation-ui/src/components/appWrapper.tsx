"use client";


import { RoleProvider } from "@/context/RoleContext";
import Header from "./Header";
import ToastProvider from "./ToastProvider";
import { AuthProvider } from "@/context/AuthContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";


const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
    <AuthProvider>
      <RoleProvider>
        <Header />
        <main className="p-4">{children}</main>
        <ToastProvider/>
        </RoleProvider>
        </AuthProvider>
        </SessionProvider>
  );
};

export default AppWrapper;
