import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: any) {
    // You can add custom logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }: { token: any }) => !!token,
    },
  }
)

// Protect these routes
export const config = { matcher: ["/dashboard", "/upload", "/processing", "/transcript/:path*", "/export/:path*", "/search"] }
