import {NextFunction, Request, Response} from "express";
import Album from "../models/Album";
import albumValidatorAsync from "../validator/album";

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

export async function addAlbum(req: Request, res: Response, next: NextFunction){
    
    const { name, artistIds, cover } = req.body;
    
    try{
    
        const data = { name, artistIds, cover }
    
        // use validate for song data before save database
        let result = await albumValidatorAsync(data)
        if(result.error){
            return res.status(409).json({message: result.error.details[0].message})
        }
    
    
        const album = new Album({name, artistIds: artistIds, cover})
        let id = await album.save()
        if(!id) {
            return res.status(500).json({message: "Please try again"})
        }
        album.albumId = Number(id)
        const {tableName, ...other} = album
        return res.status(201).json({message: "Album added", album: other})
        //
    } catch (ex){
        next(ex)
    }
}


export async function updateAlbumController(req: Request, res: Response, next: NextFunction){
    
    const {id} = req.params;
    
    const { name, artistIds, cover } = req.body;
    
    try{
        
        const data = { name, artistIds, cover }
        
        // use validate for song data before save database
        let result = await albumValidatorAsync(data)
        if(result.error){
            return res.status(409).json({message: result.error.details[0].message})
        }
        
        const album = new Album(data)
        
        let isUpdated = await album.updateOne({fieldName: 'albumId', value: id})
        if(!isUpdated) {
            return res.status(500).json({message: "Please try again"})
        }
        album.albumId = Number(id)
        const {tableName, ...other} = album
        return res.status(201).json({message: "Album is updated", album: other})
        
    } catch (ex){
        next(ex)
    }
}
