// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware({
//   publicRoutes: ["/"],
// });

// export const config = {
//   // The following matcher runs middleware on all routes
//   // except static assets.
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

// Define your public routes
const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // If the request is for a public route, allow it to proceed
  if (publicRoutes.includes(url)) {
    return NextResponse.next();
  }

  // Execute Clerk's middleware for other routes
  const clerkResponse = await clerkMiddleware(req);

  // If Clerk's middleware returns a response, use it
  if (clerkResponse) {
    return clerkResponse;
  }

  // Otherwise, continue the request
  return NextResponse.next();
}

// Configure the matcher
export const config = {
  // Apply middleware to all routes except static files and _next directory
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
