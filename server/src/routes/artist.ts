
import express from "express"
import {
    addArtistController,
    deleteArtistController,
    getAllArtistController, getArtistDetailsController,
    updateArtistController
} from "../controllers/artist";


const router = express.Router()

// GET /api/v1/artists
router.get("/", getAllArtistController)


router.get("/details/:name", getArtistDetailsController)



// POST /api/v1/artists/add-artist
router.post("/add-artist", addArtistController)


// POST /api/v1/artists/id
router.patch("/:id", updateArtistController)



// DELETE /api/v1/artists/id
router.delete("/:id", deleteArtistController)



export default router;