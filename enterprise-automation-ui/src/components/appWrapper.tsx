"use client";

import { SessionProvider } from "next-auth/react";
import Header from "./Header";
import React, { ReactNode } from "react";

const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
        <Header />
        <main className="p-4">{children}</main>
    </SessionProvider>
  );
};

export default AppWrapper;
