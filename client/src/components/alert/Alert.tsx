import React, { SyntheticEvent, useEffect, useRef } from 'react'
import './style.scss'
import { dispatch } from '../../store/AppProvider'
import { ACTION_TYPES } from '../../store/types'

const Alert = (props: { message: string; status: number }) => {
    const { message } = props
    let timerId = useRef<number>()

    useEffect(() => {
        clearTimeout(timerId.current)
        if (message) {
            timerId.current = setInterval(() => {
                dispatch({
                    type: ACTION_TYPES.SET_ALERT_MESSAGE,
                    payload: '',
                })
            }, 15000)
        }
        return () => clearTimeout(timerId.current)
    }, [message])

    let error = props.status > 200

    function handleCloseError(e: SyntheticEvent) {
        if ((e.target as HTMLDivElement).classList.contains('alert-backdrop')) {
            dispatch({
                type: ACTION_TYPES.SET_ALERT_MESSAGE,
                payload: null,
            })
        }
    }

    return (
        <>
            <div className="alert-backdrop" onClick={handleCloseError}></div>
            <div className={`alert ${error ? 'alert-error' : 'alert-success'}`}>{message}</div>
        </>
    )
}

export default Alert
