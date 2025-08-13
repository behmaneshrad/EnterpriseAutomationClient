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
          role: profile.realm_access?.roles?.[0] || "user",
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
        token.role = user.role;
        token.user = {
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.idToken = token.idToken;

        if (session.user) {
          session.user.id = token.sub as string;  
          session.user.name = token.user?.name;
          session.user.email = token.user?.email;
          session.user.role = token.role;
        } else {
          session.user = {
            id: token.sub as string,
            name: token.user?.name,
            email: token.user?.email,
            role: token.role,
          };
        }
      }
      return session;
    },
  },
};
