import axios from '@/utils/axios';
import type { NextAuthOptions } from 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: unknown | null;
      accessToken: unknown | null;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    accessToken: unknown | null;
  }

  interface JWT extends DefaultJWT {
    id: unknown | null;
    accessToken: unknown | null;
  }
}

export const logout = (redirectPath: string | undefined) => {
  const path =
    redirectPath === '/' || redirectPath === undefined ? '/login' : '/login';
  window.location.href = path;
};

export const authOptions = {
  // secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        username: { name: 'username', label: 'username' },
        password: { name: 'password', label: 'Password' },
      },

      async authorize(credentials): Promise<any> {
        try {
          const user = await axios.post('api/v1/login', {
            username: credentials?.username,
            password: credentials?.password,
          });

          if (user) {
            return {
              id: user.data.userId,
              accessToken: user.data.accessToken,
            };
          }
        } catch (e: any) {
          throw new Error(e?.message);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthOptions;
