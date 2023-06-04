import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const domain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN
        const url = domain + "token/"

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        if (!response.ok) {
          return null
        }

        return await response.json()
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login"
  },

  debug: false,

}

export default NextAuth(options)