import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Enterprise Automation UI",
  description: "enterprise automation hub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <SessionProvider>
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
