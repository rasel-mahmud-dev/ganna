import Common from "./Common";
import sqlDate from "../utils/sqlDate";

export interface AlbumType {
    albumId?: number
    name: string
    cover?: string
    createdAt?: string | Date
    artists?: []
}

class Album extends Common implements AlbumType{
    albumId?: number
    name: string
    cover?: string
    createdAt?: string | Date
    artists?: []
    
    static tableName = "albums"
    
    constructor({ name, cover, artists }: AlbumType ) {
        super(Album.tableName);
        this.name =  name
        this.cover = cover
        this.artists = artists
        this.createdAt = sqlDate(new Date())
    }
}

export default Album;

