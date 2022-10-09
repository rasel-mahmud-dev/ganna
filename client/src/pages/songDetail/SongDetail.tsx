import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../axios'
import { ACTION_TYPES } from '../../store/types'
import useStore from '../../store/useStore'

import './songDetail.scss'

const SongDetail = () => {
    const params = useParams()
    const [_, dispatch] = useStore()
    const [songDetail, setSongDetail] = useState<any>(null)

    const [expandLyric, setExpandLyric] = useState(false)

    useEffect(() => {
        api.get(`/api/v1/songs/find-by-field?slug=${params.slug}`)
            .then(({ status, data }) => {
                if (status === 200) {
                    setSongDetail(data.song)
                }
            })
            .catch((ex) => {
                console.log(ex)
            })
    }, [params.title])

    function handlePlay(music: any) {
        dispatch({
            type: ACTION_TYPES.SET_PREPARE_PLAYLIST,
            payload: {
                items: [music],
                playlistName: music.title,
                playIndex: 0,
            },
        })
    }

    return (
        <div className="container">
            <h1>{params.title}</h1>
            {songDetail && (
                <div className="detail-layout">
                    <div>
                        <img src={songDetail.cover} alt={songDetail.title} />
                        <div className="lyrics mt-5">
                            <h4>Lyrics </h4>
                            <p>
                                {expandLyric ? (
                                    <div>
                                        <span>{songDetail.lyrics}</span>
                                        <span onClick={() => setExpandLyric(false)} className="sm-text cursor-pointer">
                                            Show Less
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>{songDetail.lyrics.substring(0, 100) + '...'}</span>
                                        <span onClick={() => setExpandLyric(true)} className="sm-text cursor-pointer">
                                            Show more
                                        </span>
                                    </div>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="ml-4 song-info">
                        <h4>Song Name: {songDetail.title}</h4>
                        <h4>Singer: {songDetail.artistId}</h4>
                        <h4>Album: {songDetail.albumName}</h4>
                        <h4>Tune & Music Composition: {songDetail.tuneComposition}</h4>
                        <button onClick={() => handlePlay(songDetail)} className="btn btn-primary">
                            Play Song
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SongDetail
