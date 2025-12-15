import { betterAuth } from "better-auth";

export const auth = betterAuth({
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
