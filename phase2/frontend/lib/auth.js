import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  trustedOrigins: [
    "https://hackathon-ii-claude-code-spec-drive.vercel.app",
    process.env.NEXT_PUBLIC_APP_URL,
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  database: process.env.DATABASE_URL?.startsWith("postgres")
    ? {
      provider: "postgres",
      url: process.env.DATABASE_URL
    }
    : {
      provider: "sqlite",
      url: "./auth.db"
    },
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});
