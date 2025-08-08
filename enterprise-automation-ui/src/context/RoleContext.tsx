'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// تعریف نوع داده‌ای که داخل کانتکست قرار می‌گیره
type RoleContextType = {
  role: string;
  setRole: (role: string) => void;
};


const RoleContext = createContext<RoleContextType | null>(null);


type RoleProviderProps = {
  children: ReactNode;
};

export const RoleProvider = ({ children }: RoleProviderProps) => {
  const [role, setRole] = useState<string>("user");

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// هوک برای استفاده از کانکست با بررسی نال بودن
export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

