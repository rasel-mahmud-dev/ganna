import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../axios'
import { dispatch } from '../../store/AppProvider'
import { ACTION_TYPES } from '../../store/types'

const SongDetail = () => {
    const params = useParams()

    const [songDetail, setSongDetail] = useState<any>(null)

    useEffect(() => {
        api.get(`/api/v1/songs/find-by-field?title=${params.title}`).then(({ status, data }) => {
            if (status === 200) {
                setSongDetail(data.song)
            }
        })
    }, [params.title])

    function handlePlay(music: any) {
        dispatch({
            type: ACTION_TYPES.SET_MUSIC_DETAIL,
            payload: music,
        })
    }

    return (
        <div className="container">
            <h1>{params.title}</h1>
            {songDetail && (
                <div>
                    <img src={songDetail.cover} alt={songDetail.title} />

                    <button onClick={() => handlePlay(songDetail)} className="btn btn-primary">
                        Play Song
                    </button>
                </div>
            )}
        </div>
    )
}

export default SongDetail
