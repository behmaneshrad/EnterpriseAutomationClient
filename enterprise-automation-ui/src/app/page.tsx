'use client';

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl text-blue-950 font-bold mb-6">خوش آمدید </h1>
      <button
        onClick={() => router.push("/login")}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
      >
        ورود به حساب
      </button>
    </main>
  );
}
