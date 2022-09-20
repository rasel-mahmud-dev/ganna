import express from "express";
import song from "../routes/song";
import user from "../routes/user";

const router = express.Router()

router.use(song)
router.use("/api", user)


router.get("/", async (req, res, next)=>{
    try {
        res.send("hi")
    } catch (ex){
        next(ex)
    }
})


export default router;