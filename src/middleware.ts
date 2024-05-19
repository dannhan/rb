import { auth } from "@/auth";

export default auth((req) => {
  if (req.nextUrl.pathname === "/" && req.auth) {
    return Response.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/home") && !req.auth) {
    return Response.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/", "/home"],
};
