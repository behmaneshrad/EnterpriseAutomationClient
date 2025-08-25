"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";


// تابع کمکی برای ترجمه نقش ها
const getPersianRole = (role: string | undefined) => {
    switch (role) {
    case 'admin':
      return 'مدیر';
    case 'approver':
      return 'تاییدکننده';
    case 'employee':
      return 'کارمند';
    default:
      return 'کاربر';
  }
}

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const userRole = user?.roles?.[0];

  return (
    <header className="bg-gray-50 text-gray-900 p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-xl font-bold cursor-pointer hover:text-blue-200 pr-24"
      >
        اتوماسیون اداری
      </Link>

      <nav>
        {isAuthenticated && user ? (
          <div className="flex items-center space-x-4 rtl:space-x-reverse ">
            {/* نمایش نقش کاربر */}
            <span className="text-sm">
              نقش: {getPersianRole(userRole)}
            </span>

            {/* پروفایل من */}
            <Link href="/profile" className="hover:text-blue-200">
              پروفایل من
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-lg transition-colors duration-200 mx-8"
            >
              خروج
            </button>
          </div>
        ) : (
          
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
