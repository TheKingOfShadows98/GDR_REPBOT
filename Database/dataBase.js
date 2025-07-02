import postgres from 'postgres';
import 'dotenv/config';

// Configuración de la conexión a la base de datos PostgreSQL
const dataBase = postgres({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: 'require'
});

export {dataBase};