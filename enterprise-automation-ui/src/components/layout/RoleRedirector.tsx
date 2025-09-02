"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RoleRedirector() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const roles = user.roles || [];

    if (roles.includes("employee")) {
      router.push("/dashboard/employee");
    } else {
      router.push("/dashboard");
    }
  }, [user, isAuthenticated, router]);

  return null;
}
