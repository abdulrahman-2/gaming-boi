import { NextRequest, NextResponse } from "next/server";
import { authRoutes } from "./routes";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl;

  // const isProtectedRoute = ProtectedRoutes.includes(path.pathname);
  const isAuthRoute = authRoutes.includes(path.pathname);
  if (token && isAuthRoute) {
    path.pathname = "/";
    return NextResponse.redirect(path);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!.*\\..*|_next).*)"],
};
