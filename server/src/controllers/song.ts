import {NextFunction, Request, Response} from "express";
import Song from "../models/Song";

import Joi from 'joi';

export async function getSongController(req: Request, res: Response, next: NextFunction){
    const { id } = req.params;
    try{
        const song = await Song.findOne<Song>({songId: id})
       
        if(song) {
            return res.status(200).json({song: song})
        } else{
            return res.status(404).json({song: null})
        }
    } catch (ex){
        next(ex)
    }
}

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



export async function addSongController(req: Request, res: Response, next: NextFunction){
    
    const { title, albumId, artistId, categoryAlbumId, cover, duration, url, genreId, } = req.body;
    
    // use validate for song data before save database
    
    const schema = Joi.object({
        title: Joi.string().min(3).max(500).required(),
        cover: Joi.string().max(500).required(),
        url: Joi.string().min(3).max(500).required(),
        duration: Joi.number().min(0).required(),
        
        albumId: Joi.array().length(1),
        genreId: Joi.array().length(1),
        
        artistId: Joi.array().min(1),
        categoryAlbumId: Joi.array().length(1)
    })
    
    
    try {
        const data = {
            title,
            albumId,
            artistId,
            categoryAlbumId,
            cover,
            duration,
            url,
            genreId
        }
        
  
        let result = schema.validate(data)
        if(result.error){
            return res.status(409).json({message: result.error.details[0].message})
        }
    
        const song = new Song({
            ...data,
            albumId: data.albumId[0],
            genreId: data.genreId[0],

            artistId: JSON.stringify(data.artistId),
            categoryAlbumId: JSON.stringify(data.categoryAlbumId),
        })
        
        let id = await song.save()
        if(!id) {
            return res.status(500).json({message: "Please try again"})
        }
    
        song.songId = id
        const {tableName, ...other} = song
        return res.status(201).json({message: "Song added", song: other})

    } catch (ex){
        next(ex)
    }
}



export async function deleteSongController(req: Request, res: Response, next: NextFunction){
    
    const { id } = req.params;
    
    try{
        const isDeleted = await Song.deleteOne({songId:  Number(id)})
        if(!isDeleted) {
            return res.status(500).json({message: "Delete fail. try again"})
        }
        return res.status(201).json({message: "Song deleted"})
        
    } catch (ex){
        next(ex)
    }
}
