

import express from "express"
import { registrationController} from "../controllers/user";

const router = express.Router()


// POST /api/users/registration
router.post("/users/registration", registrationController)


export default router