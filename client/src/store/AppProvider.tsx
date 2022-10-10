import React, { ComponentType, useReducer } from 'react'
import AppContext from './AppContext'
import { ACTION_TYPES, Song } from './types'

export let dispatch: React.Dispatch<any>

// Provider in your app

export interface AppContextInterface {
    auth: {
        firstName: string
        lastName?: string
        avatar?: string
        email: string
        role?: string
    } | null

    musicDetail: null | {
        url: string
        songId: number
    }
    isOpenLeftSidebar: boolean
    player: {
        playlistName: string
        items: any[]
        playIndex: number
        isPlaying: boolean
    }
    favorites: any[]
    isPlay: boolean
    alertMessage?: string
    alertStatus?: 200 | 500
    artists: any[] | null
    sectionData: {
        'Trending Songs': Song[] | null
        'New Releases': Song[] | null
        'Top Searched Artists': Song[] | null
        'Top Playlists': Song[] | null
        'Popular In Hindi': Song[] | null
    }
    albumsList: null | object[]
    genreList: null | object[]
    categoryAlbumList: null | object[]
}

const sampleAppContext: AppContextInterface = {
    auth: null,
    musicDetail: null,
    isOpenLeftSidebar: false,
    isPlay: false,
    artists: null,
    genreList: null,
    albumsList: null,
    categoryAlbumList: null,
    sectionData: {
        'Trending Songs': null,
        'New Releases': null,
        'Top Searched Artists': null,
        'Top Playlists': null,
        'Popular In Hindi': null,
    },
    player: {
        playlistName: '',
        items: [],
        playIndex: 0,
        isPlaying: false,
    },
    alertMessage: '',
    alertStatus: 200,
    favorites: [],
}

function reducer(state: AppContextInterface, action: { type: any; payload: any }) {
    switch (action.type) {
        case ACTION_TYPES.LOGIN:
            if (action.payload) {
                const { user, token } = action.payload
                if (token) {
                    localStorage.setItem('token', token)
                }
                return {
                    ...state,
                    auth: user,
                }
            } else {
                localStorage.removeItem('token')
                return {
                    ...state,
                    auth: null,
                }
            }

        case ACTION_TYPES.SET_MUSIC_DETAIL:
            return {
                ...state,
                musicDetail: action.payload,
            }

        case ACTION_TYPES.SET_ARTISTS:
            return {
                ...state,
                artists: action.payload,
            }

        case ACTION_TYPES.TOGGLE_LEFT_SIDEBAR:
            return {
                ...state,
                isOpenLeftSidebar: !state.isOpenLeftSidebar,
            }

        case ACTION_TYPES.SET_PLAYER_SLATS:
            return {
                ...state,
                isPlay: action.payload.isPlay,
            }

        case ACTION_TYPES.SET_ALERT_MESSAGE:
            if (!action.payload) {
                return {
                    ...state,
                    alertMessage: '',
                    alertStatus: 200,
                }
            }
            return {
                ...state,
                alertMessage: action.payload.message,
                alertStatus: action.payload.status,
            }

        case ACTION_TYPES.SET_PREPARE_PLAYLIST:
            return {
                ...state,
                isPlay: true,
                player: {
                    ...state.player,
                    ...action.payload,
                },
            }

        case ACTION_TYPES.FETCH_FAVORITES_SONG:
            return {
                ...state,
                favorites: action.payload,
            }

        case ACTION_TYPES.FETCH_ALBUMS_LIST:
            return {
                ...state,
                albumsList: action.payload,
            }

        case ACTION_TYPES.FETCH_GENRES:
            return {
                ...state,
                genreList: action.payload,
            }
        case ACTION_TYPES.FETCH_CATEGORY_ALBUMS:
            return {
                ...state,
                categoryAlbumList: action.payload,
            }

        case ACTION_TYPES.SET_SECTION_SONGS:
            return {
                ...state,
                sectionData: action.payload,
            }

        default:
            return state
    }
}

function AppProvider<T>(HOC: ComponentType<T>) {
    return function (props: any) {
        // @ts-ignore
        const [state, d] = useReducer(reducer, sampleAppContext)
        dispatch = d

        return (
            <AppContext.Provider value={state}>
                <HOC {...props} />
            </AppContext.Provider>
        )
    }
}

export default AppProvider
