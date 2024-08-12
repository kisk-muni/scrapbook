import type { DefaultSession, NextAuthConfig } from 'next-auth';
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
    } & DefaultSession['user'];
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
    newUser: '/signup',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    jwt({ token, profile }) {
      // console.log('jwt just got called', token)
      if (profile) {
        token.id = profile.email;
        token.username = profile.username as string;
        token.image = profile.avatar_url || profile.picture;
      }
      return token;
    },
    session: async ({ session, token, newSession, user }) => {
      if (newSession) return newSession;
      if (user) return session;
      //console.log(session, token)
      // console.log('session just got called', session)
      if (session?.user && token?.email) {
        const profile = await db.query.profiles.findFirst({
          where: (profiles, { eq }) => eq(profiles.id, token.sub),
        });
        session.user.id = String(token.sub);
        session.user.username = profile.username;
        session.user.isTeacher = profile.isTeacher;
        session.user.fullName = profile.fullName;
      }
      return session;
    },
    authorized({ auth }) {
      return !!auth?.user; // this ensures there is a logged in user for -every- request
    },
  },
} satisfies NextAuthConfig;
