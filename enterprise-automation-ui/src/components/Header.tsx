"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";


const Header = () => {
  const { data: session, status } = useSession();

  console.log("Session:", session);
  console.log("Status:", status);
    return (
      <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <Link href="/">
        <span className="text-xl font-bold cursor-pointer hover:text-blue-200">Enterprise Automation</span>
        </Link>

        <nav>
            {/* نمایش پیام بارگذاری در صورت لزوم */}
            {status === "loading" && <div>در حال بارگذاری...</div>}

            {/* نمایش اطلاعات و لینک‌ها برای کاربران لاگین کرده */}
            {status === "authenticated" && session && (
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    {/* نمایش نام و نقش کاربری */}
                    <span className="text-sm">
                        {session.user?.name} ({session.user?.role})
                    </span>
                    {/* لینک به صفحه پروفایل */}
                    <Link href="/profile" className="hover:text-blue-200">
                    پروفایل من
                    </Link>
                    {/* دکمه خروج */}
                    <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition-colors- duration-200">
                        خروج
                    </button>
                </div>
            )}
                {/* نمایش لینک ورود برای کاربران مهمان */}
            {status === "unautheticated" && (
                <Link href="/login" className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                ورود
                </Link>
            )}
        </nav>
      </header>
    );
};

export default Header;
