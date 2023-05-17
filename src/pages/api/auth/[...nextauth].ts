import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const url = "http://localhost:8000/token/";

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const token = await res.json()
  
        // If no error and we have user data, return it
        if (!res.ok || !token) {
          return null
        }

        const user = {
          token: token,
        }

        // Return null if user data could not be retrieved
        return user
      }
    })
  ],

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: "/auth/login"
  },

  debug: false,

}

export default NextAuth(options)