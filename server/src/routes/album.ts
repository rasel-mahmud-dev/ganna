import express from "express";
import {getAllAlbums} from "../controllers/album";

const router  = express.Router()


router.get("/", getAllAlbums)

export default router

