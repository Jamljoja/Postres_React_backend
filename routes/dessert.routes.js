import { Router } from "express";
import {
  getDesserts,
  addDessert,
  updateDessert,
  deleteDessert,
} from "../controllers/dessert.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

// ✅ PUBLICO (CLIENTES Y ADMIN)
router.get("/", getDesserts);

// 🔒 SOLO ADMIN
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  addDessert
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  updateDessert
);

router.delete("/:id", verifyToken, isAdmin, deleteDessert);

export default router;
