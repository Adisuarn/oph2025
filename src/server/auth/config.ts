import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '~/server/db/prisma';

/**
 * Module augmentation for next-auth types. Allows us to add custom properties to the session
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      email: string;
      code: string;
      prefix: string;
      username: string;
      firstname: string;
      lastname: string;
      status: string;
      school: string;
      classlvl: string;
      purpose: string[];
      platform: string[];
      staff: object;
      event: object[];
      isStaff: boolean;
      isRegister: boolean;
      isTUCMC: boolean;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [GoogleProvider],
  callbacks: {
    session: async ({ session, user }) => (
      {
      ...session,
      user: {
        ...session.user,
        id: user.id,
      }
    }),
  },
} satisfies NextAuthConfig;
