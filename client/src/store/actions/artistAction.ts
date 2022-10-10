import api from '../../axios'
import { ACTION_TYPES } from '../types'
import { Dispatch } from 'react'

export function fetchArtistsAction(dispatch: Dispatch<any>, cb?: () => void) {
    api.get('/api/v1/artists').then(({ status, data }) => {
        if (status === 200) {
            dispatch({
                type: ACTION_TYPES.SET_ARTISTS,
                payload: data.artists,
            })
        }
    })
}
