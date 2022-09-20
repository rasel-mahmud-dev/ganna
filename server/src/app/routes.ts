import express from "express";

import song from "../routes/song";
import auth from "../routes/auth";

const router = express.Router()

router.use(song)
router.use("/api/v1/auth", auth)


router.get("/", async (req, res, next)=>{
    try {
        res.send("hi")
    } catch (ex){
        next(ex)
    }
})


export default router;