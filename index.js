import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import dessertRoutes from "./routes/dessert.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// TEST (solo mostrar en desarrollo)
if (process.env.NODE_ENV !== "production") {
  app.get("/", (req, res) => {
    res.send("Backend funcionando ✅");
  });
}

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/desserts", dessertRoutes);

// Server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`Servidor escuchando en puerto ${PORT} 🚀`);
    }
  });
}

export default app;
