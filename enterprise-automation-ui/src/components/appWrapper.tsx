"use client";

import Header from "./Header";
import ToastProvider from "./ToastProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <Header />
      <main className="p-4">{children}</main>
      <ToastProvider />
    </AuthProvider>
  );
};

export default AppWrapper;
