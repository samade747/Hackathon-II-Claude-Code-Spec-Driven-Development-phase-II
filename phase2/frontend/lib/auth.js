import { betterAuth } from "better-auth";

import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

const { Pool } = pg;

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  trustedOrigins: [
    "https://hackathon-ii-claude-code-spec-drive.vercel.app",
    process.env.NEXT_PUBLIC_APP_URL,
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  database: process.env.DATABASE_URL?.startsWith("postgres")
    ? {
      db: new Kysely({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
              rejectUnauthorized: false
            }
          })
        })
      }),
      type: "postgres"
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
