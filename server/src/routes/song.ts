
import express from "express"
import {addSongController, getAllSongController} from "../controllers/song";
const router = express.Router()

// GET: api/v1/songs
router.get("/", getAllSongController)


// GET: api/v1/songs
router.post("/", addSongController)


export default router;