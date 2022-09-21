import express from "express"
import { registrationController, loginController, loginWithTokenController } from "../controllers/auth";


const router = express.Router()

// POST /api/v1/auth/registration
router.post("/registration", registrationController)

// POST /api/v1/auth/login
router.post("/login", loginController)


// GET /api/v1/auth/login-token
router.get("/login-token", loginWithTokenController)


export default router;