import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "keycloak",
      name: "keycloak",
      type: "oauth",
      wellKnown: process.env.KEYCLOAK_WELLKNOWN_URL,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      profile(profile: any) {
        return {
          id: profile.sub ?? profile.id ?? profile.email,
          name: profile.name ?? profile.preferred_username ?? null,
          email: profile.email ?? null,
          roles: profile.realm_access?.roles ?? [],
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, user , profile }) {
      if (account) {
        token.accessToken = account.access_token ?? token.accessToken;
        token.refreshToken = account.refresh_token ?? token.refreshToken;
        token.idToken = (account as any ).id_token ?? (account as any).idToken;
      }
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: (user as any).roles ?? [],
        };
        }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.idToken = token.idToken;
    
        session.user = {
          id: token.user?.id ?? (token.sub as string),
          name: token.user?.name ?? null,
          email: token.user?.email ?? null,
          roles: token.user?.roles ?? [],
        };
      }
      return session;
    },
  },
};
