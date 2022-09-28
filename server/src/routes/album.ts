import express from "express";
import {addAlbum, getAllAlbums, updateAlbumController} from "../controllers/album";

const router  = express.Router()



// get all albums
// GET: /api/v1/albums
router.get("/", getAllAlbums)


// add a album;
// POST: api/v1/albums
router.post("/", addAlbum)


// add a album;
// POST: api/v1/albums
router.patch("/:id", updateAlbumController)

export default router

