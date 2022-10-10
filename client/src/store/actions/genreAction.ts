import { ACTION_TYPES } from '../types'
import api from '../../axios'

export function fetchGenresAction(dispatch: (value: any) => void) {
    api.get('/api/v1/genres/').then(({ status, data }) => {
        if (status === 200) {
            dispatch({
                type: ACTION_TYPES.FETCH_GENRES,
                payload: data.genres,
            })
        }
    })
}
