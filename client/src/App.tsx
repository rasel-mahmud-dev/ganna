import { useEffect, useState } from 'react'
import './App.scss'
import Navigation from './components/navigation/Navigation'
import Player from './components/player/Player'
import { Outlet, useLocation } from 'react-router-dom'
import { loginWihToken } from './store/actions/userAction'
import useStore from './store/useStore'

import Footer from './components/footer/Footer'

import LeftSidebar from './components/leftSidebar/LeftSidebar'
import { ACTION_TYPES } from './store/types'
import { fetchFavoriteListAction } from './store/actions/songAction'

import Alert from './components/alert/Alert'

function App() {
    const [{ auth, isOpenLeftSidebar, alertMessage, alertStatus }, dispatch] = useStore()
    const location = useLocation()

    useEffect(() => {
        loginWihToken(dispatch)

        // if (auth) {
        fetchFavoriteListAction(dispatch)
        // }
    }, [])

    function handleCloseSidebar() {
        dispatch({
            type: ACTION_TYPES.TOGGLE_LEFT_SIDEBAR,
        })
    }

    return (
        <div className="App">
            {alertMessage && <Alert message={alertMessage} status={alertStatus} />}
            <Navigation />

            <div className="app-root">
                <LeftSidebar auth={auth} onClose={handleCloseSidebar} isOpenLeftSidebar={isOpenLeftSidebar} />

                <div className="app-content">
                    <Outlet />
                    <Footer />
                </div>

                <Player />
            </div>
        </div>
    )
}

export default App
