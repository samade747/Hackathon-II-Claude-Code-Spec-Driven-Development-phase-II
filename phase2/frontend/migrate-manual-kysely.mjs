import { betterAuth } from "better-auth";
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

const { Pool } = pg;

const DATABASE_URL = 'postgresql://postgres:hikouNBLGyJeNCalPHTqhxqYXcxPyZQi@switchback.proxy.rlwy.net:17617/railway';

console.log('Starting manual Kysely migration check...');

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false } // Crucial for some cloud DBs
    })
});

const db = new Kysely({
    dialect,
});

try {
    const auth = betterAuth({
        database: {
            db: db, // Pass the Kysely instance directly
            type: "postgres" // Explicitly state type
        },
        emailAndPassword: {
            enabled: true,
        },
        autoMigration: true,
    });

    console.log('Better Auth initialized with explicit Kysely. Migrations should run automatically.');
} catch (error) {
    console.error('Migration failed:', error);
}
