import NextAuth from "next-auth";
import { cache } from "react";
import { authConfig } from "./config";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '~/server/db/prisma';

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig
});

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
