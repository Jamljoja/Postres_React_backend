import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("La variable DATABASE_URL no está definida.");
}

// IMPORTANTE: Debe decir 'export const pool'
export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Obligatorio para Supabase en Render/Docker
  },
});


// Prueba de conexión
pool.query("SELECT 1")
  .then(() => console.log("✅ Conectado a Supabase"))
  .catch((err) => console.error("❌ Error de conexión:", err.message));

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
    console.log("✅ Tabla 'desserts' lista.");
  } catch (error) {
    console.error("❌ Error al crear la tabla:", error.message);
  }
};

createTable();