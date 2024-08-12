/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { authConfig } from 'auth.config';
import NextAuth from 'next-auth';
import 'next-auth/jwt';
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    username: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    username: string | null;
  }
}
