import { NextFunction, Request, Response} from "express";
import Favorite from "../models/Favorite";
import {RequestWithAuth} from "../types";

export async function getAllFavoriteController(req: RequestWithAuth, res: Response, next: NextFunction){
    
    try{
        const sql = `
            SELECT f.*, s.title, s.duration, s.cover, s.artistId, s.url,  a.name as artistName
                FROM favorites f
                JOIN songs s ON s.songId = f.songId
                    JOIN artists a on JSON_CONTAINS(s.artistId, CAST(a.artistId as JSON))
                        WHERE userId = ${req.user.userId}
        `
        
        const favorites = await Favorite.query<Favorite[]>(sql)
        
        if(favorites) {
            let uu: any = []
            favorites.forEach((fav: any)=>{
                let index =  uu.findIndex((u: any)=>u.songId === fav.songId );
                if(index === -1) {
                    uu.push(fav)
                } else {
                    uu[index].artists = [uu[index].artistName, fav.artistName]
                }
            })
            
            return res.status(200).json({favorites: uu})
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
