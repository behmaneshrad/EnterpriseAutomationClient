"use client";


import { RoleProvider } from "@/context/RoleContext";
import Header from "./Header";
import ToastProvider from "./ToastProvider";
import React, { ReactNode } from "react";


const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
      <RoleProvider>
        <Header />
        <main className="p-4">{children}</main>
        <ToastProvider/>
        </RoleProvider>
  );
};

export default AppWrapper;
