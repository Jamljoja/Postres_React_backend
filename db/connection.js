import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({

  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT 1")
  .then(() => console.log("✅ Conectado a Supabase (POOLER)"))
  .catch(err => console.error("❌ Error DB:", err.message));

  