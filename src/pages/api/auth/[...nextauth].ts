import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/lib/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
      authorization: {
        params: {
          scope: 'email,public_profile',
        },
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.twoFactorEnabled = user.twoFactorEnabled;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.twoFactorEnabled = user.twoFactorEnabled;
      }
      return token;
    },
  },
  events: {
    async createUser({ user }) {
      // Send welcome email
      // Add any additional user setup logic here
    },
  },
})
