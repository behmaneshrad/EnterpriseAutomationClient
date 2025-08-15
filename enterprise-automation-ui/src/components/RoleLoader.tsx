'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRole } from "../context/RoleContext";

const RoleLoader = () => {
  const { data: session } = useSession();
  const { setRole } = useRole();

  useEffect(() => {
    if (session?.user?.roles && session.user.roles.length > 0) {
      const userRole = session.user.roles[0];
      setRole(userRole);
      localStorage.setItem("userRole", userRole);
    }
  }, [session, setRole]);

  return null;
};

export default RoleLoader;