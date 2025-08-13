import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { roleAccessMap } from "@/lib/roleAccess";

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    const isLoginPage = pathname.startsWith("/login");
    const isAuthenticated = !!token;

    // اگر کاربر وارد شده و در صفحه لاگین است → هدایت به صفحه اصلی
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // اگر کاربر لاگین نکرده باشد → هدایت به لاگین
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // گرفتن نقش‌ها از توکن
    const userRoles = token?.roles as string[] | undefined;
    const primaryRole = userRoles?.[0]; // نقش اصلی (اولین نقش آرایه)

    if (!primaryRole || !(primaryRole in roleAccessMap)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // بررسی مسیرهای مجاز برای نقش
    const allowedPaths = roleAccessMap[primaryRole];
    const isAllowed = allowedPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    //  ادامه مسیر
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