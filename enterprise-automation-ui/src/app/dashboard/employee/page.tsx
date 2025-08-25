"use client"

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const EmployeeDashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">داشبورد کارمندان</h1>
      <p className="text-gray-600 dark:text-gray-300">
        به داشبورد کارمندان خوش آمدید، {user?.name}.
      </p>
    </div>
  );
};

export default EmployeeDashboardPage;
