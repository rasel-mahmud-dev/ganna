import {NextFunction, Request, Response} from "express";
import Song from "../models/Song";

export async function getAllSongController(req: Request, res: Response, next: NextFunction){
    
    try{
        const songs = await Song.find<Song[]>()
       
        if(songs) {
            return res.status(200).json({songs: songs})
        } else{
            return res.status(200).json({songs: []})
        }
    } catch (ex){
        next(ex)
    }
}