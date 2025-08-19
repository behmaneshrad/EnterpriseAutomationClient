"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const UserProfile = () => {
  const { user, isAuthenticated} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p>در حال بارگذاری اطلاعات...</p>
      </div>
    )
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
            <span className={isAuthenticated ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                {isAuthenticated ? 'غیرفعال' : 'فعال'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
