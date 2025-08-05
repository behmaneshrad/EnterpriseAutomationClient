import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    {
      id: "keycloak",
      name: "keycloak",
      type: "oauth",
      wellKnown:
        "http://localhost:8080/realms/EnterpriseRealm/.well-known/openid-configuration",
      clientId: "enterprise-api",
      clientSecret: "Xz7pK93@vGmLwq!eD4Rt#2Fh",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.preferred_username,
          email: profile.email,
          role: profile.realm_access.roles[0],
        };
      },
    },
  ],
  profile(profile) {
    return {
         id: profile.sub, // Subject unique to the user
        name: profile.preferred_username, // Get username from claims
        email: profile.email,  // Get email from claims
        role: profile.realm_access.roles[0], // Get role from claims
    };
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
      }
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.idToken = token.idToken;
        if (session.user) {
          session.user.role = token.role;
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
