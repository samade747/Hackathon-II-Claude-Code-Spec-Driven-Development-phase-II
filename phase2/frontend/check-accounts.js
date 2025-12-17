import pg from 'pg';
const { Pool } = pg;

const DATABASE_URL = 'postgresql://postgres:hikouNBLGyJeNCalPHTqhxqYXcxPyZQi@switchback.proxy.rlwy.net:17617/railway';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkAccounts() {
    try {
        const res = await pool.query('SELECT * FROM "account"');
        console.log('Account count:', res.rows.length);
        console.log('Accounts:', res.rows.map(a => ({ ...a, password: a.password ? 'HASHED' : 'NULL' })));
    } catch (err) {
        console.error('Error querying accounts:', err);
    } finally {
        await pool.end();
        console.log("Database connection closed.");
    }
}

checkAccounts();
