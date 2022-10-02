import React, { SyntheticEvent, useEffect, useState } from 'react'
import api from '../../axios'
import staticPath from '../../utils/staticPath'
import { Link, useParams } from 'react-router-dom'
import Modal from '../../components/modal/Modal'
import InputGroup from '../../components/inputGroup/InputGroup'
import { BiPen, BiTrash } from 'react-icons/all'

const Geners = () => {
    const [genres, setGenres] = useState([])

    const [updateItem, setUpdateItem] = useState<{ name: string; genreId: number } | null>(null)

    const [name, setName] = useState('')

    const [isOpenModal, setOpenModal] = useState(false)

    useEffect(() => {
        api.get('/api/v1/genres').then(({ data, status }) => {
            if (status === 200) {
                setGenres(data.genres)
            }
        })
    }, [])

    useEffect(() => {
        if (updateItem) {
            setName(updateItem.name)
        }
    }, [updateItem])

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()

        if (!name) {
            alert('please provide genre name')
            return
        }

        if (updateItem) {
            api.patch(('/api/v1/genres/' + updateItem.genreId) as any, { name })
                .then(({ status, data }) => {
                    if (status === 201) {
                    }
                })
                .catch((ex) => {
                    console.log(ex)
                })
        } else {
            api.post('/api/v1/genres/add-genre', { name })
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
        setName((e.target as HTMLInputElement).value)
    }

    function handleShowUpdateForm(genre: any) {
        setUpdateItem(genre)
        setOpenModal(true)
    }

    function handleDelete(id: number) {
        api.delete('/api/v1/genres/' + id).then(({ status }) => {
            if (status === 201) {
                setGenres(genres.filter((a: any) => a.genreId !== id))
            }
        })
    }

    function addGenreModal() {
        return (
            <Modal isOpen={isOpenModal} onCloseModal={() => setOpenModal(false)}>
                <div>
                    {isOpenModal && (
                        <form onSubmit={handleSubmit}>
                            <h2>{updateItem ? 'Update Genre' : 'Add Genre'}</h2>
                            <InputGroup
                                data={{ name: name }}
                                name="name"
                                label="Name"
                                placeholder="Enter Name"
                                handleChange={handleChange}
                            />
                            <button className="btn btn-primary">{updateItem ? 'Update' : 'Add'}</button>
                        </form>
                    )}
                </div>
            </Modal>
        )
    }

    return (
        <div className="mx-4">
            {addGenreModal()}

            <div className="flex justify-between items-center mt-5">
                <h1 className="">Music Genres</h1>
                <button
                    onClick={() => {
                        setOpenModal(true)
                        setUpdateItem(null)
                    }}
                    className="btn btn-primary"
                >
                    Add Genre
                </button>
            </div>

            <ul className="mt-5">
                {genres.map((genre: any) => (
                    <div className="">
                        <div className="flex justify-between items-center">
                            <h4>{genre.name}</h4>
                            <div className="flex gap-x-4">
                                <BiPen onClick={() => handleShowUpdateForm(genre)} />
                                <BiTrash onClick={() => handleDelete(genre.genreId)} />
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Geners
