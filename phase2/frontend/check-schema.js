import pg from 'pg';
const { Pool } = pg;

const DATABASE_URL = 'postgresql://postgres:hikouNBLGyJeNCalPHTqhxqYXcxPyZQi@switchback.proxy.rlwy.net:17617/railway';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function listTables() {
    try {
        const res = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        console.log('Tables in DB:', res.rows.map(r => r.table_name));
    } catch (err) {
        console.error('Error listing tables:', err);
    } finally {
        await pool.end();
    }
}

listTables();
