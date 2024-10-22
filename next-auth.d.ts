import type { Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string | null;
      name: string | null;
    }
  }

  interface User {
    id: string;
    email: string;
    name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email?: string;
  }
}