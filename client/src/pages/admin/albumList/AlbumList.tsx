import React, { SyntheticEvent, useEffect, useState } from 'react'
import api from '../../../axios'
import Modal from '../../../components/modal/Modal'
import InputGroup from '../../../components/inputGroup/InputGroup'
import SelectGroup from '../../../components/selectGroup/SelectGroup'
import useStore from '../../../store/useStore'
import { fetchArtistsAction } from '../../../store/actions/artistAction'
import staticPath from '../../../utils/staticPath'

import './style.scss'
import { FaPen, FaTrash } from 'react-icons/all'
import { isAdmin } from '../../../utils/isAdmin'

const AlbumList = () => {
    const [{ auth, artists }, dispatch] = useStore()

    const admin = isAdmin(auth)

    const [albumList, setAlbumList] = useState([])

    useEffect(() => {
        api.get('/api/v1/albums').then(({ status, data }) => {
            if (status === 200) {
                setAlbumList(data.albums)
            }
        })

        if (artists) return
        fetchArtistsAction(dispatch)
    }, [])

    const [state, setState] = useState({
        isUpdate: '',
        openForm: false,
    })

    const [data, setData] = useState({
        name: '',
        artistIds: [],
        cover: '',
    })

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        let errorMessage = ''
        let dataKey: keyof { artistIds: []; name: string; cover: string }

        let payload: { [key: string]: any } = {}

        for (dataKey in data) {
            if (dataKey === 'artistIds') {
                // this is store multiple ids;
                if (data[dataKey] && data[dataKey].length) {
                    payload[dataKey] = data[dataKey].map((val: any) => val.artistId)
                } else {
                    errorMessage = dataKey + ' required'
                }
            } else {
                if (!data[dataKey]) {
                    errorMessage = dataKey + ' required'
                } else {
                    payload[dataKey] = data[dataKey]
                }
            }
        }

        if (errorMessage) {
            alert(errorMessage)
            return
        }

        if (state.isUpdate) {
            api.patch(('/api/v1/albums/' + state.isUpdate) as any, payload)
                .then(({ status, data }) => {
                    if (status === 201) {
                        let findItem: any = albumList.find((a: any) => a.albumId === state.isUpdate)
                        if (findItem) {
                            findItem.name = data.album.name
                            findItem.cover = data.album.cover
                            findItem.artistIds = data.album.artistIds
                        }
                        setAlbumList(albumList)
                    }
                })
                .catch((ex) => {
                    console.log(ex)
                })
        } else {
            api.post('/api/v1/albums', payload)
                .then(({ status, data }) => {
                    if (status === 201) {
                    }
                })
                .catch((ex) => {
                    console.log(ex)
                })
        }
    }

    function handleChange(e: SyntheticEvent) {
        let el = e.target as HTMLInputElement
        setData({
            ...data,
            [el.name]: el.value,
        })
    }

    function addAlbumModal() {
        console.log(data.artistIds)
        return (
            <Modal isOpen={state.openForm} onCloseModal={() => setState({ ...state, openForm: false })}>
                <div className="p-4">
                    {state.openForm && (
                        <form onSubmit={handleSubmit}>
                            <h1>{state.isUpdate ? 'Update Album' : 'Add Album'}</h1>
                            <InputGroup
                                data={data}
                                name="name"
                                label="Album Name"
                                placeholder="Enter Name"
                                handleChange={handleChange}
                            />
                            <InputGroup
                                data={data}
                                name="cover"
                                label="Album cover"
                                placeholder="Enter album cover"
                                handleChange={handleChange}
                            />

                            <SelectGroup
                                name="artistIds"
                                dataLabel="name"
                                dataIndex="artistId"
                                multiple={true}
                                value={data.artistIds}
                                label="select Artists"
                                placeholder="select Artist"
                                handleChange={handleChange}
                                renderOptions={(click) =>
                                    artists?.map((ite, index) => <li onClick={() => click(ite)}>{ite.name}</li>)
                                }
                            />

                            <button className="btn btn-primary">{state.isUpdate ? 'Update' : 'Add'}</button>
                        </form>
                    )}
                </div>
            </Modal>
        )
    }

    function handleDeleteAlbum(albumId: number) {
        api.delete('/api/v1/albums/' + albumId).then(({ status }) => {
            if (status === 201) {
                setAlbumList(albumList.filter((a: any) => a.albumId !== albumId))
            }
        })
    }

    function updateHandler(album: any) {
        setState({
            ...state,
            isUpdate: album.albumId,
            openForm: true,
        })

        let updateDate: any = { ...data }

        for (let albumKey in updateDate) {
            updateDate[albumKey] = album[albumKey]

            if (albumKey === 'artistIds') {
                if (album[albumKey] && album[albumKey].length) {
                    if (artists) {
                        updateDate[albumKey] = artists.filter((a: any) => album[albumKey].includes(a.artistId))
                    }
                }
            }
        }
        setData(updateDate)
    }

    return (
        <div className="">
            <div className="flex items-center justify-between mt-5">
                <h1 className="">Album list</h1>
                {admin && (
                    <button
                        onClick={() => {
                            setState({
                                ...state,
                                isUpdate: '',
                                openForm: true,
                            })
                        }}
                        className="btn btn-primary "
                    >
                        Add Album
                    </button>
                )}
            </div>

            {state.openForm && addAlbumModal()}

            <div>
                <table className="favorite-table">
                    <thead>
                        <tr>
                            <th className="text-center">Name</th>
                            <th className="text-start">Artist</th>
                            {admin && <th className="text-start">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {albumList.map((album: any, index: number) => (
                            <tr className={`tr   `}>
                                <td>
                                    <div className="flex items-center">
                                        <div className="album-cover">
                                            <img src={staticPath(album.cover)} />
                                        </div>
                                        <p className="track ml-4">{album.name}</p>
                                    </div>
                                </td>
                                <td>
                                    <p className="track">
                                        {album?.artists && album?.artists.map((a: string) => a + ', ')}
                                    </p>
                                </td>

                                {admin && (
                                    <td>
                                        <div className="flex items-center gap-x-4">
                                            <FaPen onClick={() => updateHandler(album)} />
                                            <FaTrash onClick={() => handleDeleteAlbum(album.albumId)} />
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AlbumList
