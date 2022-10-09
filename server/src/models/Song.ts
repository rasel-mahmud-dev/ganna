import Common from "./Common";
import sqlDate from "../utils/sqlDate";

interface SongType {
    songId?: number;
    slug: string;
    title?: string;
    duration: number;
    categoryAlbumId?: string;
    albumId?: string;
    artistId?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    cover?: string;
    url?: string;
    genreId?: string;
    lyrics?: string;
    released?: string;
    tuneComposition?: string;
}

class Song extends Common implements SongType {
    songId?: number;
    slug: string;
    title?: string;
    duration: number;
    categoryAlbumId?: string;
    albumId?: string;
    artistId?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    cover?: string;
    url?: string;
    genreId?: string;
    lyrics?: string;
    released?: string;
    tuneComposition?: string;

    static tableName = "songs";

    constructor({
        title,
        slug,
        albumId,
        artistId,
        categoryAlbumId,
        cover,
        duration,
        url,
        genreId,
        released,
        tuneComposition,
        lyrics = "",
    }: SongType) {
        super(Song.tableName);
        this.slug = slug;
        this.title = title;
        this.albumId = albumId;
        this.artistId = artistId;
        this.categoryAlbumId = categoryAlbumId;
        this.cover = cover;
        this.duration = duration;
        this.url = url;
        this.genreId = genreId;
        this.lyrics = lyrics;
        this.tuneComposition = tuneComposition;
        this.released = released;
        this.createdAt = sqlDate(new Date());
        this.updatedAt = sqlDate(new Date());
    }
}

export default Song;
