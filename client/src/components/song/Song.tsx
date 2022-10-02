import React, { FC } from 'react'
import staticPath from '../../utils/staticPath'

import './song.scss'
import { FaPlay } from 'react-icons/all'

interface Props {
    title: string
    cover?: string
    onClickPlay?: any
}

const Song: FC<Props> = ({ title, cover, onClickPlay }) => {
    return (
        <div className="song">
            <div className="song-item ">
                <div className="card relative">
                    <img src={staticPath(cover)} alt={title} title={title} />
                    <div className="card-overlay">
                        <div className="play-btn" onClick={onClickPlay}>
                            <FaPlay />
                        </div>
                    </div>
                </div>
                <p className="song-name">{title}</p>
            </div>
        </div>
    )
}

export default Song
