
import express from "express"
import {
    addSongController,
    deleteSongController,
    getAllSongController,
    getSongController,
    updateSongController
} from "../controllers/song";
const router = express.Router()

// GET: api/v1/songs
router.get("/:id", getSongController)


// GET: api/v1/songs
router.get("/", getAllSongController)


// GET: api/v1/songs
router.post("/", addSongController)


// PATCH :api/v1/songs/:id
router.patch("/:id", updateSongController)


// DELETE :api/v1/songs/:id
router.delete("/:id", deleteSongController)


export default router;