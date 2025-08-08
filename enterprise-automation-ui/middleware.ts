import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { roleAccessMap } from "@/lib/roleAccess";

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    const isLoginPage = pathname.startsWith("/login");
    const isAuthenticated = !!token;

    // ✅ اگر کاربر وارد شده باشد و در صفحه لاگین باشد او را به صفحه اصلی هدایت میکند
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ اگر کاربر لاگین نکرده باشد به صورت خودکار به صفحه لاگین میرود
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // ✅ بررسی نقش و مسیر مجاز
    const userRole = token?.user?.role;

    if (!userRole || !(userRole in roleAccessMap)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    const allowedPaths = roleAccessMap[userRole];
    const isAllowed = allowedPaths.some(path => pathname.startsWith(path));

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // ✅ اگر همه چیز اوکی بود، ادامه بده
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// ✅ مسیرهایی که باید بررسی بشن
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/login/:path*",
    "/admin/:path*",
    "/finance/:path*",
    "/hr/:path*",
    "/employee/:path*",
  ],
};