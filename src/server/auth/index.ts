import NextAuth from "next-auth";
import { cache } from "react";
import { authConfig } from "./config";
import { redirect } from "next/navigation";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

const verifySession = async () => {
  const session = await auth();
  if (!session) {
    redirect('/')
  }
  return session;
}

export { auth, handlers, signIn, signOut, verifySession };
