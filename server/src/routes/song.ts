
import express from "express"
import {addSongController, deleteSongController, getAllSongController, getSongController} from "../controllers/song";
const router = express.Router()

// GET: api/v1/songs
router.get("/:id", getSongController)


// GET: api/v1/songs
router.get("/", getAllSongController)


// GET: api/v1/songs
router.post("/", addSongController)

router.delete("/:id", deleteSongController)


export default router;