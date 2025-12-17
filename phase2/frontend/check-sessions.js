import pg from 'pg';
const { Pool } = pg;

const DATABASE_URL = 'postgresql://postgres:hikouNBLGyJeNCalPHTqhxqYXcxPyZQi@switchback.proxy.rlwy.net:17617/railway';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkSessions() {
    try {
        const res = await pool.query('SELECT * FROM "session"');
        console.log('Session count:', res.rows.length);
        if (res.rows.length > 0) {
            console.log('Sample Session:', res.rows[0]);
        } else {
            console.log('No sessions found.');
        }
    } catch (err) {
        console.error('Error querying sessions:', err);
    } finally {
        await pool.end();
        console.log("Database connection closed.");
    }
}

checkSessions();
