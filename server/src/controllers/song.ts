import {NextFunction, Request, Response} from "express";
import Song from "../models/Song";
import Artist from "../models/Artist";

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
    
    
    
    try{
        const song = new Song({
            title,
            albumId,
            artistId,
            categoryAlbumId,
            cover,
            duration,
            url,
            genreId
        })
        console.log(song)

        // let id = await artist.save()
        // if(!id) {
        //     return res.status(500).json({message: "Please try again"})
        // }
        //
        // artist.artistId = id
        // const {tableName, ...other} = artist
        // return res.status(201).json({message: "Artist added", artist: other})
        
    } catch (ex){
        next(ex)
    }
}
