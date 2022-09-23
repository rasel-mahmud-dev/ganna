import {NextFunction, Request, Response} from "express";
import Song from "../models/Song";


import songValidator from "../validator/song";
import connectDatabase from "../services/mysql";

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

export async function getSongByFieldController(req: Request, res: Response, next: NextFunction){

    const { title } = req.query;
    try{
        
        const song = await Song.findOne<Song>({title: title})

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
    
        // use validate for song data before save database
        let result = songValidator(data)
        
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



export async function updateSongController(req: Request, res: Response, next: NextFunction){
    
    const {id} = req.params;
    
    const { title, albumId, artistId, categoryAlbumId, cover, duration, url, genreId, } = req.body;
    
    
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
       
        // use validate for song data before save database
        let result = songValidator(data)
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
        
        let isUpdated = await song.updateOne({fieldName: 'songId', value: id})
        if(!isUpdated) {
            return res.status(500).json({message: "Please try again"})
        }
        song.songId = Number(id)
        const {tableName, ...other} = song
        return res.status(201).json({message: "Song updated", song: other})

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

async function loadData(){

}

export async function filterHomePageSongController(req: Request, res: Response, next: NextFunction){
    
    const { filter = [] } = req.body;
    
    let out: any = {}
    
    try{
        const database =  await connectDatabase();

        filter.forEach((item: { label: string, filterBy: string }, index: number)=>{
   
            
            (async function(){
                
                if(item.filterBy === "hit_songs"){
                    let sql = `SELECT * FROM hit_songs JOIN songs ON songs.songId = hit_songs.songId ORDER BY views DESC LIMIT 20`
                    const [result] = await database.query<any>(sql)
                    if(result) {
                        result[item.label] = result
                    }
                }
                if(item.filterBy === "createdAt"){
                    let sql = `SELECT * FROM songs ORDER BY createdAt LIMIT 30 `
                    const [result] = await database.query<any>(sql)
                    if(result) {
                        out[item.label] = result
                    }
                    // console.log(result)
                    // console.log(result)
                }
                if(item.filterBy === "hit_artists"){
                    let sql = `SELECT * FROM hit_artists JOIN artists ON artists.artistId = hit_artists.artistId ORDER BY views DESC LIMIT 20`
                    const [result] = await database.query<any>(sql)
                    if(result) {
                        out[item.label] = result
                    }
                }
                
                if((index + 1) === filter.length) {
                    setTimeout(()=>{
                    
                    return res.status(200).json({result: out})
                    }, 1000)
                }
            }())
            
        })
        
        
    } catch (ex){
        next(ex)
    }
}
