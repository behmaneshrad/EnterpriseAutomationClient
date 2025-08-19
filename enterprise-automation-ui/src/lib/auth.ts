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
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.preferred_username,
          email: profile.email,
          roles: profile.realm_access?.roles || [],
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
      }
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles,
        }
        };
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.idToken = token.idToken;
        
        session.user = {
          id: token.user?.id || 'default-id',
          name: token.user?.name || null,
          email: token.user?.email || null,
          roles: token.user?.roles || [],
        };
      }
      return session;
    },
  },
};
