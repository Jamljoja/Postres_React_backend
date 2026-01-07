import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import authRoutes from "./routes/auth.routes.js"; // Importación correcta

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// --- RUTAS ---

// 1. Ruta de Autenticación (¡ESTO FALTABA!)
// Ahora todas las rutas dentro de auth.routes.js empezarán con /api/auth
app.use("/api/auth", authRoutes); 

// 2. Obtener postres
app.get("/api/desserts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.tbl_desserts ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error en DB:", error.message);
    res.status(500).json({ error: "Error al obtener postres" });
  }
});

// 3. Ruta base para verificar que el servidor vive
app.get("/", (req, res) => {
  res.send("Backend Vital Sweet corriendo correctamente 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});