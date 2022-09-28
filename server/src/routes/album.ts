import express from "express";
import {addAlbum, deleteAlbumController, getAllAlbums, updateAlbumController} from "../controllers/album";
import auth from "../middlewares";
import {ROLE} from "../models/User";

const router  = express.Router()

// get all albums
// GET: /api/v1/albums
router.get("/", getAllAlbums)


// add a album;
// POST: api/v1/albums
router.post("/", addAlbum)


// update a album;
// PATCH: api/v1/albums
router.patch("/:id", updateAlbumController)

// add a album;
// DELETE: api/v1/albums
router.delete("/:id", deleteAlbumController)

export default router

