import NextAuth from "next-auth";

/**
 * Override of next-auth's session, to include the token
 */
declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      token: string;
    };
  }
}