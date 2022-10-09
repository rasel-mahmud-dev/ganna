import React, { useEffect } from 'react'
import useStore from '../../store/useStore'
import api from '../../axios'
import { ACTION_TYPES } from '../../store/types'
import Song from '../../components/song/Song'
import SongSkeleton from '../../components/skeleton/Song.Skeleton'
import { useNavigate } from 'react-router-dom'

const NewSongs = () => {
    const [{ sectionData }, dispatch] = useStore()

    const navigate = useNavigate()

    useEffect(() => {
        if (!sectionData['New Releases']) {
            api.get('/api/v1/songs/New-Releases').then(({ data, status }) => {
                if (status === 200) {
                    sectionData['New Releases'] = data.songs
                    dispatch({
                        type: ACTION_TYPES.SET_SECTION_SONGS,
                        payload: sectionData,
                    })
                }
            })
        }
    }, [])

    return (
        <div className="mx-4">
            <h2 className="h2">New songs</h2>
            <div className="flex song-list flex-wrap mt-5">
                {sectionData['New Releases']
                    ? sectionData['New Releases']?.map((song) => (
                          <Song
                              onClickPlay={() => navigate(`/song/${song.slug}`)}
                              cover={song.cover}
                              title={song.title}
                          />
                      ))
                    : new Array(15).fill(1).map((item) => <SongSkeleton />)}
            </div>
        </div>
    )
}

export default NewSongs
