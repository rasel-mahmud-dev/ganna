import Common from "./Common";
import sqlDate from "../utils/sqlDate";

interface SongType {
    songId?: number
    title?: string
    duration: number
    categoryAlbumId?: string
    albumId?: string
    artistId?: string
    createdAt?: string | Date
    updatedAt?: string | Date
    cover?: string
    url?: string
    genreId?: string
}


class Song extends Common implements SongType{
    songId?: number
    title?: string
    duration: number
    categoryAlbumId?: string
    albumId?: string
    artistId?: string
    createdAt?: string | Date
    updatedAt?: string | Date
    cover?: string
    url?: string
    genreId?: string
    
    static tableName = "songs"
    
    constructor({ title, albumId, artistId, categoryAlbumId, cover, duration, url, genreId }: SongType ) {
        super(Song.tableName);
        this.title =  title
        this.albumId =  albumId
        this.artistId =  artistId
        this.categoryAlbumId = categoryAlbumId
        this.cover = cover
        this.duration = duration
        this.url = url
        this.genreId = genreId
        this.createdAt = sqlDate(new Date())
        this.updatedAt = sqlDate(new Date())
    }
    
    
}

export default Song