"use client";

import { signIn } from "next-auth/react";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">ورود به اتوماسیون اداری</h1>
      <button
        onClick={() => signIn("keycloak")}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        ورود با keycloak
      </button>
    </div>
  );
};

export default LoginPage;
