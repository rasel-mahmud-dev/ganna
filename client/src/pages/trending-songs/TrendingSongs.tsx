import React, { useEffect } from 'react'
import useStore from '../../store/useStore'
import api from '../../axios'
import { ACTION_TYPES } from '../../store/types'
import SongSkeleton from '../../components/skeleton/Song.Skeleton'
import Song from '../../components/song/Song'
import { useNavigate } from 'react-router-dom'

const TrendingSongs = () => {
    const [{ sectionData }, dispatch] = useStore()

    const navigate = useNavigate()

    useEffect(() => {
        scroll({ top: 0, behavior: 'smooth' })
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

    return (
        <div className="mx-4">
            <h2 className="h2">Trending songs</h2>
            <div className="flex song-list flex-wrap mt-5">
                {sectionData['Trending Songs']
                    ? sectionData['Trending Songs']?.map((song) => (
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

export default TrendingSongs
