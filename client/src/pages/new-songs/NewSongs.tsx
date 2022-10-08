import React, { useEffect } from 'react'
import useStore from '../../store/useStore'
import api from '../../axios'
import { ACTION_TYPES } from '../../store/types'

const NewSongs = () => {
    const [{ sectionData }, dispatch] = useStore()

    useEffect(() => {
        if (!sectionData['New Releases']) {
            api.get('/api/v1/songs/New-Releases').then(({ data, status }) => {
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

    return (
        <div>
            <h1>New songs</h1>
            {sectionData['New Releases']?.map((song) => (
                <div>
                    <h4>{song.title}</h4>
                </div>
            ))}
        </div>
    )
}

export default NewSongs
