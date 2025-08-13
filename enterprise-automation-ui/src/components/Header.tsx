"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold cursor-pointer hover:text-blue-200 pr-24">
        اتوماسیون اداری
      </Link>

      <nav>
        {status === "loading" && <div>در حال بارگذاری...</div>}

        {status === "authenticated" && user && (
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* نام، ایمیل و نقش‌ها */}
            <span className="text-sm">
              {user.name} | {user.email} ({user.roles?.join(", ")})
            </span>

            {/* لینک پروفایل */}
            <Link href="/profile" className="hover:text-blue-200">
              پروفایل من
            </Link>

            {/* خروج */}
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition-colors duration-200"
            >
              خروج
            </button>
          </div>
        )}

        {status === "unauthenticated" && (
          <Link
            href="/login"
            className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition-colors duration-200"
          >
            ورود
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;