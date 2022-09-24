import Common from "./Common";
import sqlDate from "../utils/sqlDate";

export interface AlbumType {
    albumId?: number
    name: string
    cover?: string
    createdAt?: string | Date
}

class Album extends Common implements AlbumType{
    albumId?: number
    name: string
    cover?: string
    createdAt?: string | Date
    
    static tableName = "albums"
    
    constructor({ name, cover }: AlbumType ) {
        super(Album.tableName);
        this.name =  name
        this.cover = cover
        this.createdAt = sqlDate(new Date())
    }
}

export default Album;

