import api from '../../axios'
import { ACTION_TYPES } from '../types'
import { Dispatch } from 'react'

export function fetchAlbumsAction(dispatch: Dispatch<any>, cb?: () => void) {
    api.get('/api/v1/albums').then(({ status, data }) => {
        if (status === 200) {
            dispatch({
                type: ACTION_TYPES.FETCH_ALBUMS_LIST,
                payload: data.albums,
            })
        }
    })
}

export function fetchCategoryAlbumListAction(dispatch: Dispatch<any>, cb?: () => void) {
    dispatch({
        type: ACTION_TYPES.FETCH_CATEGORY_ALBUMS,
        payload: [
            { categoryAlbumId: 1, name: 'Bangla' },
            { categoryAlbumId: 2, name: 'English' },
            { categoryAlbumId: 3, name: 'Hindy' },
            { categoryAlbumId: 4, name: 'KK' },
        ],
    })
}
