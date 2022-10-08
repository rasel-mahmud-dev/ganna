import React from 'react'
import useStore from '../../store/useStore'
import staticPath from '../../utils/staticPath'

const CurrentPlayQueue = () => {
    const [{ player }] = useStore()

    return (
        <div className="mx-4">
            <h1>{player.playlistName}</h1>
            <div>
                {player.items.map((item, index) => (
                    <div className={`flex items-center mt-5 ${player.playIndex === index ? 'current-playing' : ''}`}>
                        <img src={staticPath(item.cover)} />
                        <h4>{item.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CurrentPlayQueue
