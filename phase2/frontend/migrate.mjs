import { betterAuth } from "better-auth";
import pg from "pg";

// Append SSL mode to the connection string
const DATABASE_URL = 'postgresql://postgres:hikouNBLGyJeNCalPHTqhxqYXcxPyZQi@switchback.proxy.rlwy.net:17617/railway?sslmode=no-verify';

console.log('Starting manual migration check with SSL URL...');

try {
    const auth = betterAuth({
        database: {
            provider: "postgres",
            url: DATABASE_URL,
        },
        emailAndPassword: {
            enabled: true,
        },
        autoMigration: true,
    });

    console.log('Better Auth initialized. Migrations should run automatically.');
} catch (error) {
    console.error('Migration failed:', error);
}
