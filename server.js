import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.send(" Backend Vital Sweet corriendo correctamente");
});
   
// Obtener postres
app.get("/desserts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.tbl_desserts ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error al obtener postres" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
