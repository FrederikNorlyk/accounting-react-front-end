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
        const url = "http://localhost:8000/token/";

        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const json = await res.json()
  
        if (!res.ok || !json) {
          return null
        }

        return {
          name: json.name,
        }
      }
    })
  ],

  pages: {
    signIn: "/auth/login"
  },

  debug: false,

}

export default NextAuth(options)