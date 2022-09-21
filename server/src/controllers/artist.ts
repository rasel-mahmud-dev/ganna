import {json, NextFunction, Request, Response} from "express";
import Artist from "../models/Artist";


export async function getAllArtistController(req: Request, res: Response, next: NextFunction){
    
    try{
        const artists = await Artist.find<Artist[]>()
        if(artists) {
            return res.status(200).json({artists: artists})
        } else{
            next("Internal Error")
        }
    } catch (ex){
        next(ex)
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

export async function deleteArtistController(req: Request, res: Response, next: NextFunction){
    const { id } = req.params;
    
    try{
        const isDeleted = await Artist.deleteOne({artistId:  Number(id)})
        if(!isDeleted) {
            return res.status(500).json({message: "Delete fail. try again"})
        }
        return res.status(201).json({message: "Artist deleted"})
        
    } catch (ex){
        next(ex)
    }
}
