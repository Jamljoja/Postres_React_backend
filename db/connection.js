import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;

// Tomamos la URL del entorno
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: connectionString,
  // IMPORTANTE: El puerto 6543 de Supabase SIEMPRE requiere SSL
  ssl: {
    rejectUnauthorized: false
  },
  // Configuración de estabilidad
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test de conexión inmediato
pool.query('SELECT NOW()')
  .then(() => console.log("✅ CONECTADO A SUPABASE EXITOSAMENTE"))
  .catch(err => {
    console.error("❌ ERROR CRÍTICO DE CONEXIÓN:");
    console.error(err.message);
  });
  export { pool };
export default pool;

// Crear tabla
export const createTable = async () => {
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
    console.error("❌ Error creando tabla:", error.message);
  }
};

createTable();