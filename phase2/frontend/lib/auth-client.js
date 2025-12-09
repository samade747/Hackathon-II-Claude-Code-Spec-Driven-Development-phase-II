import { createAuthClient } from "@better-auth/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export async function getToken() {
  const session = await authClient.getSession();
  return session?.session?.token || null;
}

export async function getUserId() {
  const session = await authClient.getSession();
  return session?.user?.id || null;
}
