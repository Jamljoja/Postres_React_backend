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
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS desserts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC,
        image_url TEXT
      );
    `);
    console.log("✅ Tabla 'desserts' verificada o creada.");
  } catch (error) {
    console.error("❌ Error al crear la tabla:", error);
  }
};

createTable();
  