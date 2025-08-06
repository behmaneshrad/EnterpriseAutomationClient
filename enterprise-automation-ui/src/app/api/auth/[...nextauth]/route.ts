import NextAuth from "next-auth";

const handler = NextAuth({
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
          name: profile.preferred_username,
          email: profile.email,
          role: profile.realm_access?.roles?.[0] || 'user', // اضافه کردن یک مقدار پیش‌فرض
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
        // اطلاعات user را به توکن اضافه می‌کنیم تا در session callback در دسترس باشد
        token.user = {
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // این بخش اطلاعات را از توکن به شیء session منتقل می‌کند
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.idToken = token.idToken;
        session.user = {
          ...session.user,
          ...token.user, // اطلاعات کاربر را از توکن به سشن اضافه می‌کنیم
          role: token.role,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };