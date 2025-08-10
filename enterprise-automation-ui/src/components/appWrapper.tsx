"use client";

import { SessionProvider } from "next-auth/react";
import { RoleProvider } from "@/context/RoleContext";
import RoleLoader from "./RoleLoader";
import Header from "./Header";
import ToastProvider from "./ToastProvider";
import React, { ReactNode } from "react";


const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <RoleProvider>
        <Header />
        <main className="p-4">{children}</main>
        <ToastProvider/>
        </RoleProvider>
    </SessionProvider>
  );
};

export default AppWrapper;
