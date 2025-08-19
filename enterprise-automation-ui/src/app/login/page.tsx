"use client";

import { signIn } from "next-auth/react";
import React, { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    signIn('keycloak', {callbackUrl: '/'})
  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">ورود به اتوماسیون اداری</h1>
      <button
        onClick={() => signIn("keycloak", {callbackUrl: "/dashboard"})}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        ورود با keycloak
      </button>
    </div>
  );
};

export default LoginPage;
