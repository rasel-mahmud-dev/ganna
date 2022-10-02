import express from "express";

import song from "../routes/song";
import auth from "../routes/auth";
import artist from "../routes/artist";
import favorite from "../routes/favorite";
import album from "../routes/album";
import genreRoute from "../routes/genreRoute";
const router = express.Router();

router.use("/api/v1/auth", auth);
router.use("/api/v1/artists", artist);
router.use("/api/v1/songs", song);
router.use("/api/v1/favorite", favorite);
router.use("/api/v1/albums", album);
router.use("/api/v1/genres", genreRoute);

router.get("/", async (req, res, next) => {
    try {
        res.send("hi");
    } catch (ex) {
        next(ex);
    }
});

export default router;
