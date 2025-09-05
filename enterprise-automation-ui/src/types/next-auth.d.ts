import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    roles: string[];
    name?: string | null;
    email?: string | null;
  }

  interface Session {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    roles: string[];
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      roles?: string[];
    };
  }
}
