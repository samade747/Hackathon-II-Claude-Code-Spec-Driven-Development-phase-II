import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === 'production' ? "https://hackathon-ii-claude-code-spec-drive.vercel.app" : "http://localhost:3000"),
});

export async function getToken() {
  const session = await authClient.getSession();
  return session?.session?.token || null;
}

export async function getUserId() {
  const session = await authClient.getSession();
  return session?.user?.id || null;
}
