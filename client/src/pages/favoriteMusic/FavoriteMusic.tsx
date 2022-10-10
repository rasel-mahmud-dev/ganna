import React, { useEffect, useState } from 'react'
import api from '../../axios'
import staticPath from '../../utils/staticPath'

import './style.scss'
import { ACTION_TYPES, Song } from '../../store/types'
import useStore from '../../store/useStore'

const FavoriteMusic = () => {
    const [{ favorites, player }, dispatch] = useStore()

    useEffect(() => {}, [])

    function handlePlayPrepare(song: Song, index: number, list: any) {
        let playlistName = 'Favorites'

        dispatch({
            type: ACTION_TYPES.SET_PREPARE_PLAYLIST,
            payload: {
                items: list,
                playlistName,
                playIndex: index,
            },
        })
    }

    return (
        <div className="container">
            <div>
                <h2 className="mt-5 mb-2">Favorite list</h2>

                <table className="favorite-table">
                    <thead>
                        <tr>
                            <th>Track</th>
                            <th className="text-start">Artist</th>
                            <th className="text-start">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorites.map((fav: any, index: number) => (
                            <tr
                                className={`tr  ${
                                    player.playlistName === 'Favorites' && player.playIndex === index
                                        ? 'active-item'
                                        : ''
                                } `}
                            >
                                <td>
                                    <div
                                        className="flex items-center"
                                        onClick={() => handlePlayPrepare(fav, index, favorites)}
                                    >
                                        <div className="thumb-40">
                                            <img className="w-full" src={staticPath(fav.cover)} />
                                        </div>
                                        <p className="track ml-4 w-full">{fav.title}</p>
                                    </div>
                                </td>
                                <td>
                                    <p className="track">{fav?.artists && fav?.artists.map((a: string) => a + ', ')}</p>
                                </td>
                                <td>
                                    <div className="track">{fav.duration}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FavoriteMusic
