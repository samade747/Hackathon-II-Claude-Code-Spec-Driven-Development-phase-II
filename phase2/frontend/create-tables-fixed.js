import pg from 'pg';
const { Pool } = pg;

const DATABASE_URL = 'postgresql://postgres:hikouNBLGyJeNCalPHTqhxqYXcxPyZQi@switchback.proxy.rlwy.net:17617/railway';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const schema = `
  CREATE TABLE IF NOT EXISTS "user" (
      id TEXT NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      "emailVerified" BOOLEAN NOT NULL,
      image TEXT,
      "createdAt" TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "session" (
      id TEXT NOT NULL PRIMARY KEY,
      "expiresAt" TIMESTAMP NOT NULL,
      "token" TEXT NOT NULL UNIQUE,
      "ipAddress" TEXT,
      "userAgent" TEXT,
      "userId" TEXT NOT NULL REFERENCES "user"(id),
      "createdAt" TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "account" (
      id TEXT NOT NULL PRIMARY KEY,
      "accountId" TEXT NOT NULL,
      "providerId" TEXT NOT NULL,
      "userId" TEXT NOT NULL REFERENCES "user"(id),
      "accessToken" TEXT,
      "refreshToken" TEXT,
      "idToken" TEXT,
      "accessTokenExpiresAt" TIMESTAMP,
      "refreshTokenExpiresAt" TIMESTAMP,
      "scope" TEXT,
      "password" TEXT,
      "createdAt" TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "verification" (
      id TEXT NOT NULL PRIMARY KEY,
      identifier TEXT NOT NULL,
      value TEXT NOT NULL,
      "expiresAt" TIMESTAMP NOT NULL,
      "createdAt" TIMESTAMP,
      "updatedAt" TIMESTAMP
  );
`;

// Note: I kept accountId NOT NULL based on search result saying it holds provider's ID.
// But if it fails, I will make it NULLABLE.
// Actually, better-auth docs say accountId is required.
// But maybe "password" text field was missing in original create-tables?
// Original had "password" TEXT.
// Original session table was missing "token" column?
// Original: "expiresAt", "ipAddress", "userAgent", "userId". MISSING "token"??
// SEARCH RESULT: session table has "token".
// THIS IS IT! Session table missing "token" column would definitely crash sign-in (creating session).

async function runMigration() {
    try {
        console.log('Running fixed manual migration...');
        await pool.query(schema);
        console.log('Migration successful: Tables created.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await pool.end();
        console.log("Database connection closed.");
    }
}

runMigration();
