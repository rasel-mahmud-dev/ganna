import express from "express";

import { addGenre, deleteGenre, getAllGenres, updateGenre } from "../controllers/genreController";

const router = express.Router();

// GET /api/v1/genres
router.get("/", getAllGenres);

// POST /api/v1/genres/add-genres
router.post("/add-genre", addGenre);

// POST /api/v1/genres/id
router.patch("/:id", updateGenre);

// DELETE /api/v1/genres/id
router.delete("/:id", deleteGenre);

export default router;
