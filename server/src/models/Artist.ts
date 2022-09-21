export interface ArtistType {
    artistId?: number
    name: string
    email: string
    avatar?: string
    createdAt?: string | Date
    updatedAt?: string | Date
}

class M{

}

class Artist extends M implements ArtistType{
    artistId?: number
    name: string
    email: string
    avatar?: string
    createdAt?: string | Date
    updatedAt?: string | Date
    
    static tableName = "artists"
    
    constructor({ name, email, avatar }: ArtistType ) {
        super();
        this.name =  name
        this.email = email
        this.avatar = avatar
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}

export default Artist