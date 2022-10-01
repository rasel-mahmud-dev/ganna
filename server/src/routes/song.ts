
import express from "express"
import {
    addSongController,
    deleteSongController, filterHomePageSongController,
    getAllSongController, getSongByFieldController,
    getSongController, searchSongController,
    updateSongController
} from "../controllers/song";
const router = express.Router()

// GET: /api/v1/songs/find-by-field?title=ASD
router.get("/find-by-field", getSongByFieldController)


// POST: /api/v1/songs/search
router.post("/search", searchSongController)


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


// POST :api/v1/songs/filter/
router.post("/filter", filterHomePageSongController)


export default router;