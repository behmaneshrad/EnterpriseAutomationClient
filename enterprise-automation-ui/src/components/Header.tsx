"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gray-50 text-gray-900 p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-xl font-bold cursor-pointer hover:text-blue-200 pr-24"
      >
        اتوماسیون اداری
      </Link>

      <nav>
        {!isAuthenticated && !user ? (
          <div>در حال بارگذاری...</div>
        ) : isAuthenticated ? (
          // نمایش اطلاعات و لینک ها برای کاربران لاگین کرده
          <div className="flex items-center space-x-4 rtl:space-x-reverse ">
            {/* نام، ایمیل و نقش کاربر */}
            <span className="text-sm">
              {user?.name} | {user?.email} | ({user?.roles?.[0]})
            </span>

            {/* لینک پروفایل */}
            <Link href="/profile" className="hover:text-blue-200">
              پروفایل من
            </Link>

            {/* خروج */}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-lg transition-colors duration-200 mx-8"
            >
              خروج
            </button>
          </div>
        ) : (
          // نمایش لینک ورود برای کاربران مهمان
          <Link
            href="/login"
            className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition-colors duration-200 "
          >
            ورود
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
