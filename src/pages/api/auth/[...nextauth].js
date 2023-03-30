import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import isAdmin from "@/common/admin-check"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      if (isAdmin(token.email)){
        token.userRole = "admin"
      }
      return token;
    }
  },
  secret : process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: "/signin",
  }
}

export default NextAuth(authOptions);