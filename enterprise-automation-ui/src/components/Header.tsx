import React from "react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <div>
          <span>
            {session.user.name} ({session.user.role})
          </span>
          <button
            onClick={() => signOut()}
            className="ml-4 p-1 bg-red-500 rounded"
          >
            خروج
          </button>
        </div>
      </header>
    );
  }

  return null;
};

export default Header;
