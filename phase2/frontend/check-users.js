import pg from 'pg';
const { Pool } = pg;

const DATABASE_URL = 'postgresql://postgres:hikouNBLGyJeNCalPHTqhxqYXcxPyZQi@switchback.proxy.rlwy.net:17617/railway';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkUsers() {
    try {
        const res = await pool.query('SELECT * FROM "user"');
        console.log('User count:', res.rows.length);
        console.log('Users:', res.rows);
    } catch (err) {
        console.error('Error querying users:', err);
    } finally {
        await pool.end();
    }
}

checkUsers();
