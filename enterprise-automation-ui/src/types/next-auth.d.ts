import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
    interface User extends DefaultUser {
        role?: string;
    }

    interface Session {
        accessToken?: string;
        refreshToken?: string;
        idToken?: string;
        user: {
          id?: string;
          name?: string | null;
          email?: string | null;
          role?: string;
        };
    
    }
}


declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    role?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      role?: string;
    };
  }
}