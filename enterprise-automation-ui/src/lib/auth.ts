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
        const roles = profile.realm_access?.roles || [];
        return {
          id: profile.sub,
          name: profile.name || profile.preferred_username,
          email: profile.email,
          roles, // همه نقش‌ها
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
        token.roles = user.roles; // ذخیره همه نقش‌ها
        token.user = {
          name: user.name,
          email: user.email,
          roles: user.roles,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.idToken = token.idToken as string;

        if (session.user) {
          session.user.id = token.sub as string;
          session.user.name = token.user?.name;
          session.user.email = token.user?.email;
          session.user.roles = token.roles as string[];
        } else {
          session.user = {
            id: token.sub as string,
            name: token.user?.name,
            email: token.user?.email,
            roles: token.roles as string[],
          };
        }
      }
      return session;
    },
  },
};