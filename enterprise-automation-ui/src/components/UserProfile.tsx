"use client";

import React from "react";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const user = session?.user

  if (status === "loading") {
    return;
    <div>در حال بارگذاری...</div>;
  }
  // اگر کاربر لاگین نکرده بود
  if (!session || !session.user) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p>لطفا برای مشاهده پروفایل، ابتدا وارد شوید.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          پروفایل کاربری
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">نام:</span>
            <span className="text-gray-900">{user?.name}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">نقش:</span>
            <span className="text-gray-900 dark:text-white">{user?.roles?.[0]}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">ایمیل:</span>
            <span className="text-gray-900">{user?.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">وضعیت:</span>
            {/*  status نمایش داینامیک وضیعیت  */}
            <span className={status === 'authenticated' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                {status === 'authenticated' ? 'غیرفعال' : 'فعال'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
