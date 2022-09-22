import Common from "./Common";

interface HitSongType {
    id?: number
    songId?: number
    views: number
}

/**
 * this table store song views/play times
 * */

class HitSong extends Common implements HitSongType{
    id?: number
    songId?: number
    views: number
    
    static tableName = "hit_songs"
    
    constructor({ views, songId }: HitSongType ) {
        super(HitSong.tableName);
        this.views = views
        this.songId = songId
    }
}

export default HitSong