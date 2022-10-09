import React from 'react'
import useStore from '../../store/useStore'
import staticPath from '../../utils/staticPath'
import './style.scss'
import { ACTION_TYPES, Song } from '../../store/types'
import { FaEllipsisH, FaEllipsisV, FaTimes, TiTimes } from 'react-icons/all'

const CurrentPlayQueue = () => {
    const [{ player }, dispatch] = useStore()

    function handlePlay(index: number) {
        dispatch({
            type: ACTION_TYPES.SET_PREPARE_PLAYLIST,
            payload: {
                ...player,
                playIndex: index,
            },
        })
    }

    return (
        <div className="mx-4 queue-page">
            <div className="grid-row">
                <div className="song-cover">
                    <img src="https://a10.gaanacdn.com/gn_img/albums/Rz4W87v3xD/4W8eLQG1bx/size_l.webp" alt="" />
                </div>

                <div>
                    <div className="flex justify-between">
                        <h4 className="h4">
                            {/*{player.playlistName}*/}
                            Queue{' '}
                        </h4>

                        <button className="btn btn-primary rounded-full">Save playlist</button>
                    </div>
                    <div className="queue-list">
                        {player.items.map((item: Song, index) => (
                            <li
                                onClick={() => handlePlay(index)}
                                className={`queue-item flex items-center ${
                                    player.playIndex === index ? 'current-queue-playing' : ''
                                }`}
                            >
                                <span className="flex items-center">
                                    <img src={staticPath(item.cover)} />
                                    <span>
                                        <h4>{item.title}</h4>
                                        <p>{'Taaron Ke Shehar'}</p>
                                    </span>
                                </span>
                                <span className="actions">
                                    <FaTimes />
                                    <FaEllipsisV />
                                    <span>{item.duration}</span>
                                </span>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentPlayQueue
