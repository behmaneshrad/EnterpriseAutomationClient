'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    console.log("ورود با Keycloak شروع شد ");
    setLoading(true);
    signIn("keycloak", {
      callbackUrl: "/dashboard",
      prompt: "login" //  این خط باعث نمایش اجباری فرم لاگین میشه
    });
  };

  return (
    <main className="bg-amber-50">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl mb-4 text-blue-800">کاربر گرامی لطفا وارد شوید</h2>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`px-6 py-3 rounded transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          } text-white`}
        >
          {loading ? "در حال ورود..." : "ورود با Keycloak"}
        </button>
      </div>
    </main>
  );
}