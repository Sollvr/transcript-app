import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any custom logic here
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Add your authorization logic here
        return !!token
      },
    },
  }
)

export const config = { matcher: ["/dashboard", "/upload", "/processing", "/transcript/:path*", "/export/:path*", "/search"] }