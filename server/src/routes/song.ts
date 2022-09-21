
import express from "express"
import {getAllSongController} from "../controllers/song";
const router = express.Router()

// GET: api/v1/songs
router.get("/", getAllSongController)


export default router;