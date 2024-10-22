// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials"

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com', password: 'password456' },
] as const

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = users.find(user => user.email === credentials.email)
        
        if (user && user.password === credentials.password) {
          const { password, ...userWithoutPassword } = user
          return userWithoutPassword
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({token, user}: any) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({session, token}: any) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt" as const,
  },
  debug: true,
}





















