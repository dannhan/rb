import { auth } from "@/auth";

/* todo: 
  - consider using authorized callback in your auth.ts
  - https://authjs.dev/getting-started/session-management/protecting
*/

export default auth((req) => {
  const isAuthenticated = !!req.auth;

  if (!isAuthenticated && req.nextUrl.pathname !== "/") {
    return Response.redirect(new URL("/", req.url));
  }

  /* redirect authenticated users */
  if (isAuthenticated && req.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/home", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
