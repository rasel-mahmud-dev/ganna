
import express from "express"
import {addArtistController} from "../controllers/artist";


const router = express.Router()

// POST /api/v1/admin/add-artist
router.post("/add-artist", addArtistController)



export default router;