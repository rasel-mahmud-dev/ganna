import express from "express";
import song from "../routes/song";
import user from "../routes/user";


const router = express.Router()

router.use(song)
router.use(user)

export default router;