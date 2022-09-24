import express from "express";

import {getAllFavoriteController, addFavoriteController, deleteFavoriteController} from "../controllers/favorite";
import auth from "../middlewares";
import { ROLE } from "../models/User";

const router = express.Router();


// GET /api/v1/favorite/all
// @ts-ignore
router.get("/all", auth([ROLE.USER, ROLE.ADMIN]), getAllFavoriteController)


// POST /api/v1/favorite
// router.post("/", auth([ROLE.USER, ROLE.ADMIN], addFavoriteController), (req, res,next)=>{

// @ts-ignore
router.post("/", auth([ROLE.USER, ROLE.ADMIN]), addFavoriteController)


// DELETE /api/v1/favorite/id
router.delete("/:id", deleteFavoriteController)



export default router;