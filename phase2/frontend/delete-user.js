import pg from 'pg';
const { Pool } = pg;

// Using the same hardcoded URL found in check-users.js
const DATABASE_URL = 'postgresql://postgres:hikouNBLGyJeNCalPHTqhxqYXcxPyZQi@switchback.proxy.rlwy.net:17617/railway';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function deleteUser() {
    try {
        console.log('Deleting user test@example.com...');
        const res = await pool.query('DELETE FROM "user" WHERE email = $1', ['test@example.com']);
        console.log(`Deleted ${res.rowCount} user(s).`);
    } catch (err) {
        console.error('Error deleting user:', err);
    } finally {
        await pool.end();
        console.log("Database connection closed.");
    }
}

deleteUser();
