import React, { useEffect, useState } from 'react'

import InputGroup from '../../components/inputGroup/InputGroup'
import SelectGroup from '../../components/selectGroup/SelectGroup'
import api from '../../axios'
import { useParams } from 'react-router-dom'
import TextareaGroup from '../../components/textareaGroup/TextareaGroup'
import { dispatch } from '../../store/AppProvider'
import { ACTION_TYPES } from '../../store/types'
import catchErrorMessage from '../../utils/catchErrorMessage'
import { fetchAlbumsAction, fetchCategoryAlbumListAction } from '../../store/actions/albumAction'
import useStore from '../../store/useStore'
import { fetchArtistsAction } from '../../store/actions/artistAction'
import { fetchGenresAction } from '../../store/actions/genreAction'

const AddSong = () => {
    const params = useParams()
    const [{ albumsList, artists, genreList, categoryAlbumList }, dispatch] = useStore()

    const [songDetail, setSongDetail] = useState(null)
    const [songData, setSongData] = useState<any>({
        title: 'Text',
        slug: '',
        duration: 3.3,
        categoryAlbumId: [], // multiple ids
        artistId: [], // multiple ids
        albumId: [],
        genreId: [],
        url: 'sad',
        cover: '34',
        released: '',
        tuneComposition: '',
    })

    useEffect(() => {
        ;(async function () {
            if (!params.id) return
            const { status, data } = await api.get('/api/v1/songs/' + params.id)
            if (status !== 200) {
                return
            }
            let item = data.song
            setSongDetail(item)
            let findGenreId = genreList.find((g) => item.genreId == g.genreId)
            let findAlbumId = albumsList.find((g) => item.albumId == g.albumId)

            setSongData({
                ...songData,
                title: item.title,
                duration: item.duration,
                // categoryAlbumId: item.categoryAlbumId,
                // artistId: item.artistId,
                albumId: [findAlbumId],
                genreId: [findGenreId],
                url: item.url,
                released: item.released,
                slug: item.slug,
                tuneComposition: item.tuneComposition,
                lyrics: item.lyrics,
                cover: item.cover,
            })
        })()
    }, [params.id])

    useEffect(() => {
        // if (songDetail) {
        //     let findAlbumIds = artists.filter((g) => songDetail.artistId.includes(g.artistId))
        //     let categoryAlbumId = categoryAlbums.filter((g) => songDetail.categoryAlbumId.includes(g.categoryAlbumId))
        //
        //     setSongData({
        //         ...songData,
        //         categoryAlbumId: categoryAlbumId,
        //         artistId: findAlbumIds,
        //     })
        // }
    }, [artists, songDetail])

    function handleChange(e: React.SyntheticEvent) {
        const ele = e.target as HTMLInputElement
        setSongData({
            ...songData,
            [ele.name]: ele.value,
        })
    }

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()

        let errorMessage = ''
        let songDataKey: any

        let payload: any = {}

        let optionsFields = ['lyrics', 'slug', 'released', 'tuneComposition']

        for (songDataKey in songData) {
            if (optionsFields.includes(songDataKey)) {
                payload[songDataKey] = songData[songDataKey]
            } else if (songDataKey === 'genreId' || songDataKey === 'albumId') {
                // this is store single id;
                if (songData[songDataKey] && songData[songDataKey].length) {
                    payload[songDataKey] = songData[songDataKey].map((val: any) => val[songDataKey])
                } else {
                    errorMessage = songDataKey + ' required'
                }
            } else if (songDataKey === 'categoryAlbumId' || songDataKey === 'artistId') {
                // this is store multiple ids;
                if (songData[songDataKey] && songData[songDataKey].length) {
                    payload[songDataKey] = songData[songDataKey].map((val: any) => val[songDataKey])
                } else {
                    errorMessage = songDataKey + ' required'
                }
            } else {
                if (!songData[songDataKey]) {
                    errorMessage = songDataKey + ' required'
                } else {
                    payload[songDataKey] = songData[songDataKey]
                }
            }
        }

        if (errorMessage) {
            dispatch({
                type: ACTION_TYPES.SET_ALERT_MESSAGE,
                payload: {
                    message: errorMessage,
                    status: 500,
                },
            })
            return
        }

        if (params.id) {
            //  update song

            api.patch('/api/v1/songs/' + params.id, payload)
                .then((response) => {
                    if (response.status === 201) {
                        dispatch({
                            type: ACTION_TYPES.SET_ALERT_MESSAGE,
                            payload: {
                                message: 'Music update successfully',
                                status: 200,
                            },
                        })
                    }
                })
                .catch((ex) => {
                    dispatch({
                        type: ACTION_TYPES.SET_ALERT_MESSAGE,
                        payload: {
                            message: catchErrorMessage(ex),
                            status: 500,
                        },
                    })
                })
        } else {
            api.post('/api/v1/songs', payload)
                .then((response) => {
                    if (response.status === 201) {
                        dispatch({
                            type: ACTION_TYPES.SET_ALERT_MESSAGE,
                            payload: {
                                message: 'Music added successfully',
                                status: 200,
                            },
                        })
                    }
                })
                .catch((ex) => {
                    dispatch({
                        type: ACTION_TYPES.SET_ALERT_MESSAGE,
                        payload: {
                            message: catchErrorMessage(ex),
                            status: 500,
                        },
                    })
                })
        }
    }

    function fetchMusicAlbum() {
        if (!albumsList) fetchAlbumsAction(dispatch)
    }
    function fetchMusicArtists() {
        if (!artists) fetchArtistsAction(dispatch)
    }
    function fetchMusicGenres() {
        if (!genreList) fetchGenresAction(dispatch)
    }
    function fetchCategoryAlbumList() {
        if (!categoryAlbumList) fetchCategoryAlbumListAction(dispatch)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>{params.id ? 'Update Song' : 'Add New Song'}</h1>
                <InputGroup
                    data={songData}
                    name="title"
                    label="Song Title"
                    placeholder="Enter song title"
                    handleChange={handleChange}
                />
                <InputGroup data={songData} name="slug" label="Slug" placeholder="slug" handleChange={handleChange} />
                <InputGroup
                    data={songData}
                    name="cover"
                    label="Song cover"
                    placeholder="Enter cover link"
                    handleChange={handleChange}
                />
                <InputGroup
                    data={songData}
                    type="number"
                    name="duration"
                    label="Song Duration"
                    placeholder="Enter song duration"
                    handleChange={handleChange}
                />

                <SelectGroup
                    name="genreId"
                    dataLabel="name"
                    dataIndex="genreId"
                    value={songData.genreId}
                    label="select genreId"
                    placeholder="select genreId"
                    handleChange={handleChange}
                    onClick={fetchMusicGenres}
                    renderOptions={(click) =>
                        genreList?.map((ite: any, index) => <li onClick={() => click(ite)}>{ite.name}</li>)
                    }
                />

                <SelectGroup
                    name="artistId"
                    dataLabel="name"
                    dataIndex="artistId"
                    multiple={true}
                    value={songData.artistId}
                    onClick={fetchMusicArtists}
                    label="select Artist"
                    placeholder="select Artist"
                    handleChange={handleChange}
                    renderOptions={(click) =>
                        artists?.map((ite, index) => <li onClick={() => click(ite)}>{ite.name}</li>)
                    }
                />

                <SelectGroup
                    name="categoryAlbumId"
                    dataLabel="name"
                    dataIndex="categoryAlbumId"
                    value={songData.categoryAlbumId}
                    label="select categoryAlbumId"
                    placeholder="select categoryAlbumId"
                    handleChange={handleChange}
                    onClick={fetchCategoryAlbumList}
                    renderOptions={(click) =>
                        categoryAlbumList?.map((ite) => <li onClick={() => click(ite)}>{ite.name}</li>)
                    }
                />

                <SelectGroup
                    name="albumId"
                    dataLabel="name"
                    dataIndex="albumId"
                    value={songData.albumId}
                    onClick={fetchMusicAlbum}
                    label="select albumId"
                    placeholder="select albumId"
                    handleChange={handleChange}
                    renderOptions={(click) =>
                        albumsList?.map((ite: any) => <li onClick={() => click(ite)}>{ite.name}</li>)
                    }
                />

                <InputGroup
                    data={songData}
                    name="url"
                    label="Song URL"
                    placeholder="Enter song url"
                    handleChange={handleChange}
                />
                <InputGroup
                    data={songData}
                    name="tuneComposition"
                    label="tuneComposition "
                    placeholder="tuneComposition "
                    handleChange={handleChange}
                />
                <InputGroup
                    data={songData}
                    name="released"
                    label="Release Year"
                    placeholder="Release year"
                    handleChange={handleChange}
                />

                <TextareaGroup
                    data={songData}
                    name="lyrics"
                    label="Song Lyrics"
                    placeholder="Lyrics"
                    handleChange={handleChange}
                />

                <button className="btn btn-primary">{params.id ? 'Update' : 'Add'}</button>
            </form>
        </div>
    )
}

export default AddSong
