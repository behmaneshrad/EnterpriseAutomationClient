"use client";


import { RoleProvider } from "@/context/RoleContext";
import Header from "./Header";
import ToastProvider from "./ToastProvider";
import { AuthProvider } from "@/context/AuthContext";
import React, { ReactNode } from "react";


const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <RoleProvider>
        <Header />
        <main className="p-4">{children}</main>
        <ToastProvider/>
        </RoleProvider>
        </AuthProvider>
  );
};

export default AppWrapper;
