
import express from "express"
import {addArtistController, deleteArtistController, getAllArtistController} from "../controllers/artist";


const router = express.Router()

// GET /api/v1/artists
router.get("/", getAllArtistController)



// POST /api/v1/admin/add-artist
router.post("/add-artist", addArtistController)



// DELETE /api/v1/admin/artists
router.delete("/:id", deleteArtistController)



export default router;