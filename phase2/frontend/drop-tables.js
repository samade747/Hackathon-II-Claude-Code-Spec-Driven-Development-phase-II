import pg from 'pg';
const { Pool } = pg;

const DATABASE_URL = 'postgresql://postgres:hikouNBLGyJeNCalPHTqhxqYXcxPyZQi@switchback.proxy.rlwy.net:17617/railway';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function dropTables() {
    try {
        console.log('Dropping tables...');
        // Drop in order of dependencies (account/session depend on user)
        await pool.query('DROP TABLE IF EXISTS "account" CASCADE');
        await pool.query('DROP TABLE IF EXISTS "session" CASCADE');
        await pool.query('DROP TABLE IF EXISTS "verification" CASCADE');
        await pool.query('DROP TABLE IF EXISTS "user" CASCADE');
        console.log('Tables dropped successfully.');
    } catch (err) {
        console.error('Error dropping tables:', err);
    } finally {
        await pool.end();
        console.log("Database connection closed.");
    }
}

dropTables();
