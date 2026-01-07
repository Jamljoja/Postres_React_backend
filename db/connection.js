import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
  keepAlive: true,
});

pool.query("SELECT 1")
  .then(() => console.log("✅ Conectado a Supabase (POOLER)"))
  .catch(err => console.error("❌ Error DB:", err.message));
