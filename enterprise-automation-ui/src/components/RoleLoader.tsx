'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRole } from "../context/RoleContext";

const RoleLoader = () => {
  const { data: session } = useSession();
  const { setRole } = useRole();

  useEffect(() => {
    if (session?.user?.roles?.length) {
      setRole(session.user.roles[0]);
    }
  }, [session, setRole]);

  return null;
};

export default RoleLoader;