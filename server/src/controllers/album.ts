import {NextFunction, Request, Response} from "express";
import Album from "../models/Album";

export async function getAllAlbums(req: Request, res: Response, next: NextFunction){
    
    try{
        const albums = await Album.find<Album[]>()
        if(albums) {
            return res.status(200).json({albums})
        } else{
            next("Internal Error")
        }
    } catch (ex){
        next(ex)
    }
}
