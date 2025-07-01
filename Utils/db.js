import postgres from 'postgres';

// Option 1: Using an environment variable (recommended)
const db = postgres(process.env.DATABASE_URL);

export default db;