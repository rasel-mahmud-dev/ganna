import { NextFunction, Request, Response} from "express";
import Favorite from "../models/Favorite";


export async function getAllFavoriteController(req: Request, res: Response, next: NextFunction){
    
    try{
        const favorites = await Favorite.find<Favorite[]>()
        if(favorites) {
            return res.status(200).json({favorites})
        } else{
            next("Internal Error")
        }
    } catch (ex){
        next(ex)
    }
}


export async function addFavoriteController(req: Request, res: Response, next: NextFunction){
   
    const { songId } = req.body;
    // @ts-ignore
    const {userId} = req.user
    
    try{
        const favorite = new Favorite({songId, userId})
        let id = await favorite.save()
        if(!id) {
            return res.status(500).json({message: "Please try again"})
        }
    
        favorite.favoriteId = id
        const {tableName, ...other} = favorite
        return res.status(201).json({message: "added to favorite", favorite: other})
        
    } catch (ex){
        next(ex)
    }
}





export async function deleteFavoriteController(req: Request, res: Response, next: NextFunction){
    const { id } = req.params;
    
    try{
        const isDeleted = await Favorite.deleteOne({favoriteId:  Number(id)})
        if(!isDeleted) {
            return res.status(500).json({message: "Delete fail. try again"})
        }
        return res.status(201).json({message: "Remove from favorite"})
        
    } catch (ex){
        next(ex)
    }
}
