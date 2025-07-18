import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, token: _token }) {
      return session;
    },
    async jwt({ token, account: _account }) {
      return token;
    },
  },
  pages: {
    signIn: '/',
  },
};

export default NextAuth(authOptions);