
import express from "express"
import {addArtistController, getAllArtistController} from "../controllers/artist";


const router = express.Router()

// GET /api/v1/admin/artists
router.get("/artists", getAllArtistController)



// POST /api/v1/admin/add-artist
router.post("/add-artist", addArtistController)



export default router;