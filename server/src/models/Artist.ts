import Common from "./Common";
import sqlDate from "../utils/sqlDate";
import {UserType} from "./User";
import connectDatabase from "../services/mysql";

export interface ArtistType {
    artistId?: number
    name: string
    email: string
    avatar?: string
    createdAt?: string | Date
    updatedAt?: string | Date
}


class Artist extends Common implements ArtistType{
    artistId?: number
    name: string
    email: string
    avatar?: string
    createdAt?: string | Date
    updatedAt?: string | Date
    
    static tableName = "artists"
    
    constructor({ name, email, avatar }: ArtistType ) {
        super(Artist.tableName);
        this.name =  name
        this.email = email
        this.avatar = avatar
        this.createdAt = sqlDate(new Date())
        this.updatedAt = sqlDate(new Date())
    }
}

export default Artist