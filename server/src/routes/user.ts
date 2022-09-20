

import express from "express"
import {registration} from "../controllers/user";

const router = express.Router()


router.post("/users/registration", registration)


export default router