
import { betterAuth } from "better-auth";
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

const { Pool } = pg;

const DATABASE_URL = 'postgresql://postgres:hikouNBLGyJeNCalPHTqhxqYXcxPyZQi@switchback.proxy.rlwy.net:17617/railway';

console.log('Starting robust migration...');

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
});

const db = new Kysely({ dialect });

// Initialize Better Auth to trigger migration
try {
    const auth = betterAuth({
        database: {
            db: db,
            type: "postgres"
        },
        emailAndPassword: { enabled: true },
        autoMigration: true,
    });
    console.log('Better Auth initialized. Waiting for tables...');
} catch (e) {
    console.error("Init failed:", e);
}

async function waitForTables() {
    const start = Date.now();
    while (Date.now() - start < 60000) { // 60s timeout
        try {
            const res = await pool.query(`
                SELECT count(*) FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name IN ('user', 'account', 'session')
            `);
            const count = parseInt(res.rows[0].count);
            console.log(`Found ${count} tables so far...`);
            if (count >= 3) {
                console.log("Migration successful! Tables created.");
                process.exit(0);
            }
        } catch (e) {
            console.error("Check failed:", e.message);
        }
        await new Promise(r => setTimeout(r, 2000));
    }
    console.error("Timeout waiting for migration.");
    process.exit(1);
}

waitForTables();
