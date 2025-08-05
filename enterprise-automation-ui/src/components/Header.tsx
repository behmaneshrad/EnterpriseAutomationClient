"use client";

import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import {useAuth} from "@/hooks/useAuth";

const Header = () => {
  const { data: session, status } = useAuth();

  
    return (
      <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <Link href="/">
        <span className="text-xl font-bold cursor-pointer">Enterprise Automation</span>
        </Link>

        <nav>
            {status === "loading" && <div>در حال بارگذاری...</div>}

            {status === "authenticated" && session && (
                <div className="flex items-center space-x-4">
                    <span className="text-sm">
                        {session.user?.name} ({session.user?.role})
                    </span>
                    <Link href="/profile" className="hover:text-gray-300">
                    پروفایل من
                    </Link>
                    <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg">
                        خروج
                    </button>
                </div>
            )}

            {status === "unautheticated" && (
                <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                ورود
                </Link>
            )}
        </nav>
      </header>
    );
};

export default Header;
