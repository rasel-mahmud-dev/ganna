import Common from "./Common";


export interface FavoriteType {
    favoriteId?: number
    userId?: number
    songId?: number
    createdAt?: Date | string
}

class Favorite extends Common implements FavoriteType{
    favoriteId?: number
    userId?: number
    songId?: number
    createdAt?: Date | string
    
    static tableName = "favorites"
    
    constructor({ songId, userId }: FavoriteType ) {
        super(Favorite.tableName)
        this.songId = songId
        this.userId = userId
    }
}


export default Favorite