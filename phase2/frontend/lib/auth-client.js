import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NODE_ENV === 'production' ? undefined : "http://localhost:3000",
});

export async function getToken() {
  const session = await authClient.getSession();
  return session?.data?.session?.token || null;
}

export async function getUserId() {
  const session = await authClient.getSession();
  return session?.data?.user?.id || null;
}
