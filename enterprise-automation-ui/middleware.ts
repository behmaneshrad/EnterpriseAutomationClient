import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    const isLoadingPage = request.nextUrl.pathname.startsWith("/login");
    const isAuthenticated = !!request.nextauth.token;
    // اگر کاربر وارد شده باشد و در صفحه لاگین باشد او را به صفحه اصلی هدایت میکند
    if (isLoadingPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // اگر کاربر لاگین نکرده باشد به صورت خودکار به صفحه لاگین میرود 
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login/:path*"],
};
