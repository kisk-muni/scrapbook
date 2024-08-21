import type { DefaultSession, NextAuthConfig, User } from 'next-auth';
import 'next-auth/jwt';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from 'db';
import { accounts, profiles, sessions, verificationTokens } from 'db/schema';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      username: string;
      fullName: string;
      isTeacher: boolean;
      isProfileComplete: boolean;
    } & DefaultSession['user'];
  }
  interface User {
    username?: string | null;
    fullName?: string | null;
    avatar?: string | null;
    isTeacher?: boolean;
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: profiles,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login', // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, profile, account, user, trigger, session }) => {
      // console.log('jwt just got called', token)
      if (profile && account) {
        token.id = profile.email;
        token.username = user?.username;
        token.avatar = user?.avatar;
        token.fullName = user?.fullName;
        token.isTeacher = user?.isTeacher;
        token.image = profile.avatar_url || profile.picture;
      }
      if (trigger == 'update') {
        token.username = session.user.username;
        token.fullName = session.user.fullName;
        token.avatar = session.user.avatar;
        token.isProfileComplete =
          !!session.user.username && !!session.user.fullName;
      }
      console.log('JWT', token);
      return token;
    },
    session: async ({ session, token, newSession, user }) => {
      if (newSession) return newSession;
      if (user) return session;
      //console.log(session, token)
      // console.log('session just got called', session)
      if (session?.user) {
        session.user.id = String(token.sub);
        session.user.username = token.username;
        session.user.fullName = token.fullName as unknown as string | null;
        session.user.isProfileComplete =
          !!token.username && !!session.user.fullName;
        console.log(token);
      }
      return session;
    },
    authorized({ auth }) {
      return !!auth?.user; // this ensures there is a logged in user for -every- request
    },
  },
} satisfies NextAuthConfig;
