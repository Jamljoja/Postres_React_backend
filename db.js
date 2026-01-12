import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,                 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.query("SELECT NOW()")
  .then(() => console.log(" Conectado a Supabase OK"))
  .catch(err => {
  console.error("DB error:", err);
  console.error("code:", err?.code, "message:", err?.message);
});

