export enum ACTION_TYPES {
    LOGIN = 'LOGIN',
    SET_MUSIC_DETAIL = 'SET_MUSIC_DETAIL',
    TOGGLE_LEFT_SIDEBAR = 'TOGGLE_LEFT_SIDEBAR',
    SET_PREPARE_PLAYLIST = 'SET_PREPARE_PLAYLIST',
    FETCH_FAVORITES_SONG = 'FETCH_FAVORITES_SONG',
    SET_PLAYER_SLATS = 'SET_PLAYER_SLATS',
    SET_ALERT_MESSAGE = 'SET_ALERT_MESSAGE',
    SET_ARTISTS = 'SET_ARTISTS',
    SET_SECTION_SONGS = 'SET_SECTION_SONGS',
}

// interface define only datatype of property and method in object. it is not declare implementation
export interface Song {
    songId?: number
    title: string
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
