import {NextFunction, Request, Response} from "express";
import Artist from "../models/Artist";


export function getAllArtistController(req: Request, res: Response, next: NextFunction){
    
    try{
        const artist = Artist.findOne({artistId: 1})
        console.log(artist)
        
    } catch (ex){
    
    }
    
    
}

export async function addArtistController(req: Request, res: Response, next: NextFunction){
    const { name, email, avatar } = req.body;
    
    try{
        const artist = new Artist({name, email, avatar})
        let id = await artist.save()
        if(!id) {
            return res.status(500).json({message: "Please try again"})
        }
        
        artist.artistId = id
        const {tableName, ...other} = artist
        return res.status(201).json({message: "Artist added", artist: other})
        
    } catch (ex){
        next(ex)
    }
}