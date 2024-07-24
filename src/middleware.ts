import { auth } from "@/auth";

/* todo: 
  - consider using authorized callback in your auth.ts
  - https://authjs.dev/getting-started/session-management/protecting 
*/

export default auth((req) => {
  /* protecting resources for non-authenticated users */
  if (!req.auth && req.nextUrl.pathname) {
    return Response.redirect(new URL("/", req.url));
  }

  /* redirect authenticated users */
  if (req.auth && req.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/blocks", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
