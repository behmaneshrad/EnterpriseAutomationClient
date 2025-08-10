"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";


const Header = () => {
  const { data: session, status } = useSession();

  console.log("Session:", session);
  console.log("Status:", status);
    return (
      <header className="p-4 bg-gray-200 text-gray-900 flex justify-between items-center">
        <Link href="/">
        <span className="text-xl font-bold cursor-pointer hover:text-gray-700 pr-24">اتوماسیون اداری</span>
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
                    {/* دکمه خروج */}
                    <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition-colors- duration-200">
                        خروج
                    </button>
                </div>
            )}
           
        </nav>
      </header>
    );
};

export default Header;


{/* اطلاعات کاربر */}
<div className="flex justify-end items-center space-x-4">
<span className="text-sm text-gray-600">سمیه بیکی</span>
<span className="text-sm text-gray-500">سمت: مدیر</span>
{/* آیکون‌ها */}
<div className="flex space-x-2">
  <button>🔔</button>
  <button>⚙️</button>
  <button>🚪</button>
</div>
</div>