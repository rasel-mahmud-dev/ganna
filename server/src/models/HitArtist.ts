import Common from "./Common";

interface HitArtistType {
    id?: number
    artistId?: number
    views: number
}

/**
 * this table store artist views times
 * */

class HitArtist extends Common implements HitArtistType{
    id?: number
    artistId?: number
    views: number
    
    static tableName = "hit_artists"
    
    constructor({ views, artistId }: HitArtistType ) {
        super(HitArtist.tableName);
        this.views = views
        this.artistId = artistId
    }
}

export default HitArtist