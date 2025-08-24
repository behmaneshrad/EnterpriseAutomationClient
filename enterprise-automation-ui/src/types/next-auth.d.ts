import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
    interface User extends DefaultUser {
        roles: string[];
        name?: string | null;
        email?: string | null;
        id: string;
    }

    interface Session {
        accessToken?: string;
        refreshToken?: string;
        idToken?: string;
        roles: string[];
        user: User
 
}
}


declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    roles: string[];
    user?: {
      name?: string | null;
      email?: string | null;
      roles?: string[];
      id: string;
    };
  }
}