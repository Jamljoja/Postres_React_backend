import { pool } from "../db/connection.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs-extra";

export const getDesserts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM desserts ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo postres" });
  }
};

export const addDessert = async (req, res) => {
  try {
    const { name, description, stock, price, category } = req.body;
    let image_url = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "vital_sweet",
      });
      image_url = result.secure_url;
      await fs.unlink(req.file.path);
    }

    const result = await pool.query(
      `INSERT INTO desserts 
        (name, description, stock, price, image_url, category)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, stock, price, image_url, category]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error agregando postre" });
  }
};

export const updateDessert = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, stock, price, category } = req.body;
    let image_url = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "vital_sweet",
      });
      image_url = result.secure_url;
      await fs.unlink(req.file.path);
    }

    const result = await pool.query(
      `UPDATE desserts SET
        name = $1,
        description = $2,
        stock = $3,
        price = $4,
        image_url = COALESCE($5, image_url),
        category = $6
      WHERE id = $7
      RETURNING *`,
      [name, description, stock, price, image_url, category, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando postre" });
  }
};

export const deleteDessert = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      "DELETE FROM desserts WHERE id = $1",
      [id]
    );
    res.json({ message: "Postre eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando postre" });
  }
};
