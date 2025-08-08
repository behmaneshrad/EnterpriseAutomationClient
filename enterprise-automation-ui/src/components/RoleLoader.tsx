'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRole } from "../context/RoleContext";

const RoleLoader = () => {
  const { data: session } = useSession();
  const { setRole } = useRole();

  useEffect(() => {
    if (session?.user?.role) {
      setRole(session.user.role);
    }
  }, [session]);

  return null;
};

export default RoleLoader;