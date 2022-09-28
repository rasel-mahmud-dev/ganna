import Common from "./Common";
import sqlDate from "../utils/sqlDate";

export interface AlbumType {
    albumId?: number
    name: string
    cover?: string
    createdAt?: string | Date
    artistIds?: [] | string
}

class Album extends Common implements AlbumType{
    albumId?: number
    name: string
    cover?: string
    createdAt?: string | Date
    artistIds?: [] | string
    
    static tableName = "albums"
    
    constructor({ name, cover, artistIds }: AlbumType ) {
        super(Album.tableName);
        this.name =  name
        this.cover = cover
        this.artistIds = JSON.stringify(artistIds)
        this.createdAt = sqlDate(new Date())
    }
}

export default Album;

