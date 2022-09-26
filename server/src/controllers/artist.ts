import { NextFunction, Request, Response} from "express";
import Artist from "../models/Artist";
import Song from "../models/Song";
import artistValidator from "../validator/artist";


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

export async function getArtistDetailsController(req: Request, res: Response, next: NextFunction){
    
    const {name} = req.params
    
    try {
        let sql = `SELECT * FROM artists WHERE name = "${name}"`
        let  artist: any = await Artist.query(sql);
        if(!artist || !artist.length){
            return res.status(404).json({message: "Artist not found"})
        }
        
        artist = artist[0]
        
        sql = `SELECT s.*, a.name as artistName FROM songs s

             JOIN artists a on JSON_CONTAINS(s.artistId, CAST(a.artistId as JSON))
             
                WHERE JSON_CONTAINS(s.artistId, CAST(${artist.artistId} as JSON))`
        
        const songs: any = await Song.query(sql)
        let uu: any = []
        
        
        if(songs){
            songs.forEach((song: any)=>{
                let index =  uu.findIndex((u: any)=>u.songId === song.songId );
        
                if(index === -1) {
                    song.artists = [song.artistName]
                    uu.push(song)
                   
                } else {
                    if(uu[index].artists){
                        uu[index].artists.push(song.artistName)
                    } else {
                        uu[index].artists = [uu[index].artistName, song.artistName]
                    }
                }
            })
        }
        
        if(artist) {
            return res.status(200).json({songs: uu, artist: artist})
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


export async function updateArtistController(req: Request, res: Response, next: NextFunction){
    
    const {id} = req.params;
    
    const { name, avatar, email } = req.body;
    
    
    try {
        const data = { name, avatar, email }
        
        // use validate for song data before save database
        let result = artistValidator(data)
        if(result.error){
            return res.status(409).json({message: result.error.details[0].message})
        }
        
        const artist = new Artist(data)
        
        let isUpdated = await artist.updateOne({fieldName: 'artistId', value: id})
        if(!isUpdated) {
            return res.status(500).json({message: "Please try again"})
        }
        artist.artistId = Number(id)
        const {tableName, ...other} = artist
        return res.status(201).json({message: "Artist is updated", artist: other})
        
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
