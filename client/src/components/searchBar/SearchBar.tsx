import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { BiSearch, MdClear } from 'react-icons/all'

import './searchBar.scss'
import api from '../../axios'
import staticPath from '../../utils/staticPath'

const SearchBar = () => {
    const timeOutRef = useRef<number>()

    const [state, setState] = useState({
        open: false,
        searchValue: '',
        result: {
            songs: [],
            artists: [],
        },
    })

    function handleChange(e: SyntheticEvent) {
        setState({
            ...state,
            searchValue: (e.target as HTMLInputElement).value,
        })
    }

    useEffect(() => {
        if (state.searchValue) {
            timeOutRef.current && clearTimeout(timeOutRef.current)
            timeOutRef.current = setTimeout(() => {
                handleSearch()
            }, 1000)
        }
    }, [state.searchValue])

    function handleSearch() {
        const value = state.searchValue

        api.post('/api/v1/songs/search', { text: value }).then(({ data, status }) => {
            if (status === 200) {
                setState({
                    ...state,
                    result: data,
                })
            }
        })
    }

    console.log(state)

    const inputRef = useRef<HTMLInputElement>(null)

    function handleClickOnSearch() {
        setState({
            ...state,
            open: true,
        })
        inputRef.current?.click()
    }

    function handleCloseSearchMenu(e: SyntheticEvent) {
        e.stopPropagation()
        setState({
            ...state,
            open: false,
        })
    }

    return (
        <>
            {state.open && <div className="search-backdrop" onClick={handleCloseSearchMenu}></div>}
            <div className={`search-menu ${state.open ? 'search-menu--expand' : ''}`}>
                <div className="">
                    <div className="search-input" onClick={handleClickOnSearch}>
                        <div className="placeholder-space">
                            <div className="search-input-demo">
                                <BiSearch className="search-icon" />
                                <span className="search-label">Search music</span>
                            </div>

                            <input
                                value={state.searchValue}
                                onChange={handleChange}
                                ref={inputRef}
                                className="user-search-input"
                                type="text"
                                placeholder="Search Music, Artists, Playlist"
                            />

                            <div className={`search-input-control ${state.open ? 'search-input-control--open' : ''}`}>
                                <span className="search-reset">Clear</span>
                                <MdClear onClick={handleCloseSearchMenu} className="search-clear" />
                            </div>
                        </div>

                        <div className={`search-content ${state.open ? 'search-content-open' : ''}`}>
                            <div className="search-result-out">
                                <div>
                                    <h4 className="">Songs</h4>
                                    {state.result?.songs &&
                                        state.result?.songs.map((song: any) => (
                                            <div>
                                                <h4 className="">{song.title}</h4>
                                            </div>
                                        ))}
                                </div>

                                <div>
                                    <h4 className="">Artists</h4>
                                    <div className="search-artist-list">
                                        {state.result?.artists &&
                                            state.result?.artists.map((artist: any) => (
                                                <div className="search-artist">
                                                    <img src={staticPath(artist.avatar)} alt="" />
                                                    <h4 className="artist-name">{artist.name}</h4>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="">Albums</h4>
                                    <div className="search-album-list">
                                        {state.result?.albums &&
                                            state.result?.albums.map((album: any) => (
                                                <div className="search-album">
                                                    <h4 className="album-name">{album.name}</h4>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchBar
