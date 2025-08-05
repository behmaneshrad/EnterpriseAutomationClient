import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" { 
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    user?: Partial<DefaultUser> & {
      role?: string;
    };
  }

  interface User extends Partial <DefaultUser> {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    role?: string;
  }
}