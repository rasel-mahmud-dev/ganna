import React, { useEffect } from 'react'
import useStore from '../../store/useStore'
import api from '../../axios'
import { ACTION_TYPES } from '../../store/types'

const TrendingSongs = () => {
    const [{ sectionData }, dispatch] = useStore()

    useEffect(() => {
        if (!sectionData['Trending Songs']) {
            api.get('/api/v1/songs/Trending-Songs').then(({ data, status }) => {
                if (status === 200) {
                    sectionData['Trending Songs'] = data.songs
                    dispatch({
                        type: ACTION_TYPES.SET_SECTION_SONGS,
                        payload: sectionData,
                    })
                }
            })
        }
    }, [])

    console.log(sectionData['Trending Songs'])

    return (
        <div>
            <h1>Trending songs</h1>
            {sectionData['Trending Songs']?.map((song) => (
                <div>
                    <h4>{song.title}</h4>
                </div>
            ))}
        </div>
    )
}

export default TrendingSongs
