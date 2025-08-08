"use client";

import { SessionProvider } from "next-auth/react";
import { RoleProvider } from "@/context/RoleContext";
import RoleLoader from "./RoleLoader";
import Header from "./Header";
import React, { ReactNode } from "react";


const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <RoleProvider>
        <Header />
        <main className="p-4">{children}</main>
        </RoleProvider>
    </SessionProvider>
  );
};

export default AppWrapper;
