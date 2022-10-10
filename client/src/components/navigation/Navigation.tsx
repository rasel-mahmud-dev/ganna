import React, { useEffect, useRef, useState } from 'react'
import './styles.scss'

import { AiFillDashboard, BiSearch, BiUser, FaBars, FaSignOutAlt } from 'react-icons/all'
import { Link, NavLink } from 'react-router-dom'
import useStore from '../../store/useStore'
import staticPath from '../../utils/staticPath'
import Dropdown from '../dropdown/Dropdown'
import { ACTION_TYPES } from '../../store/types'
import SearchBar from '../searchBar/SearchBar'
import GetScreenWidth from '../../hooks/GetScreenWidth'

const Navigation = (props: { screenWidth: number }) => {
    const [state, dispatch] = useStore()

    const [openDropdown, setOpenDropdown] = useState('')

    function handleDropDown(item: string) {
        setOpenDropdown(item)
    }

    function handleChangeVar() {
        let root = document.documentElement
        let headerHeight = (navigationRef.current as HTMLDivElement).offsetHeight
        root.style.setProperty('--search-panel-height', `calc(100vh - ${200}px`)
        root.style.setProperty('--header-height', `${headerHeight}px`)
    }

    let navigationRef = useRef()

    useEffect(() => {
        // if (props.screenWidth > 91300) {
        handleChangeVar()

        // }
    }, [props.screenWidth])

    function toggleLeftSidebar() {
        dispatch({
            type: ACTION_TYPES.TOGGLE_LEFT_SIDEBAR,
        })
    }

    function handleLogout() {
        dispatch({
            type: ACTION_TYPES.LOGIN,
            payload: null,
        })
    }

    return (
        <div>
            <header className="navigation" ref={navigationRef}>
                <div className="container">
                    <div className="main-nav">
                        <FaBars className="menu-bar" onClick={toggleLeftSidebar} />

                        <div className="logo-menu">
                            <div className="logo">
                                <NavLink className="flex" to="/">
                                    <img className="img-1" src="/g.svg" alt="" />
                                    <img className="img-2" src="/gUngUn.svg" alt="" />
                                </NavLink>
                            </div>
                        </div>

                        <div className="searchbar-container">
                            <SearchBar />
                        </div>
                        <div className="right-menu flex items-center">
                            {state.auth ? (
                                <li
                                    className="relative"
                                    onMouseOver={() => handleDropDown('auth')}
                                    onMouseLeave={() => handleDropDown('')}
                                    onClick={() => handleDropDown('auth')}
                                >
                                    <span className="flex items-center">
                                        <div>
                                            <img
                                                className="auth-avatar flex"
                                                src={staticPath(state.auth.avatar)}
                                                alt=""
                                            />
                                        </div>
                                        <span className="auth-username">{state.auth.firstName}</span>
                                    </span>
                                    <Dropdown isOpen={openDropdown === 'auth'} onClose={() => setOpenDropdown('')}>
                                        <div className="flex flex-col">
                                            <Link className="dropdown-item flex items-center" to="/admin/dashboard">
                                                <AiFillDashboard />
                                                <span>Dashboard</span>
                                            </Link>
                                            <Link className="dropdown-item flex items-center" to="/admin/dashboard">
                                                <BiUser />
                                                <span>Profile</span>
                                            </Link>
                                            <span className="dropdown-item flex items-center" onClick={handleLogout}>
                                                <FaSignOutAlt />
                                                <span> Logout</span>
                                            </span>
                                        </div>
                                    </Dropdown>
                                </li>
                            ) : (
                                <div className="flex ">
                                    <li className="text-login">
                                        <Link to="/auth/login">Log In / Sign Up</Link>
                                    </li>
                                    <div className="mobile-search-btn">
                                        <BiSearch />
                                    </div>
                                    <li className="icon-login">
                                        <Link to="/auth/login">
                                            <BiUser />
                                        </Link>
                                    </li>
                                </div>
                            )}
                        </div>
                    </div>
                    {/*<input type="text" className="w-full mobile-search-input" />*/}
                </div>
            </header>
            <div className="spaceH"></div>
        </div>
    )
}

export default GetScreenWidth(Navigation)
