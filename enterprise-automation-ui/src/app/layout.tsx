import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import AppWrapper from "@/components/layout/appWrapper";
import {Vazirmatn} from 'next/font/google'

const vazirmatn = Vazirmatn({
  subsets:['arabic'],
  weight:['400', '700'],
})

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
    <html lang="fa" dir="rtl" className="bg-gray-50">
      <body className={vazirmatn.className}>
        <AppWrapper>
          {children}
          </AppWrapper>
      </body>
    </html>
  );
}
