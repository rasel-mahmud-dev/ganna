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
        recentSearch: null,
    })

    function handleChange(e: SyntheticEvent) {
        setState((prevState) => ({
            ...prevState,
            searchValue: (e.target as HTMLInputElement).value,
        }))
    }

    useEffect(() => {
        if (state.searchValue) {
            timeOutRef.current && clearTimeout(timeOutRef.current)
            timeOutRef.current = setTimeout(() => {
                handleSearch()
            }, 1000)
        }
    }, [state.searchValue])

    useEffect(() => {
        let recentSearch = localStorage.getItem('recentSearch')
        if (recentSearch) {
            recentSearch = JSON.parse(recentSearch)
            if (recentSearch) {
                setState({
                    ...state,
                    recentSearch: recentSearch as any,
                })
            }
        }
    }, [])

    function handleSearch() {
        const value = state.searchValue
        if (!value) return

        api.post('/api/v1/songs/search', { text: value }).then(({ data, status }) => {
            if (status === 200) {
                setState((prevState) => ({
                    ...prevState,
                    result: data,
                }))

                let items = 0
                for (const dataKey in data) {
                    if (data[dataKey] && data[dataKey].length > 0) {
                        items++
                    }
                }

                if (items > 1) {
                    let recentSearch: any = localStorage.getItem('recentSearch')
                    if (recentSearch) {
                        recentSearch = JSON.parse(recentSearch)
                        if (!recentSearch.includes(value.trim())) {
                            recentSearch.push(value.trim())
                        }
                    } else {
                        recentSearch = [value]
                    }
                    localStorage.setItem('recentSearch', JSON.stringify(recentSearch))
                    setState((prevState) => ({
                        ...prevState,
                        recentSearch: recentSearch,
                    }))
                }
            }
        })
    }

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
                                {/******** result for songs *********/}
                                <div>
                                    <h4 className="search-result-label">Songs</h4>
                                    {state.result?.songs ? (
                                        state.result?.songs.map((song: any) => (
                                            <div>
                                                <h4 className="">{song.title}</h4>
                                            </div>
                                        ))
                                    ) : (
                                        <h3 className="not-found-result">No Song match</h3>
                                    )}
                                </div>

                                {/******** result for artists *********/}
                                <div>
                                    <h4 className="search-result-label">Artists</h4>
                                    <div className="search-artist-list">
                                        {state.result?.artists ? (
                                            state.result?.artists.map((artist: any) => (
                                                <div className="search-artist">
                                                    <img src={staticPath(artist.avatar)} alt="" />
                                                    <h4 className="artist-name">{artist.name}</h4>
                                                </div>
                                            ))
                                        ) : (
                                            <h3 className="not-found-result">No artists match</h3>
                                        )}
                                    </div>
                                </div>

                                {/******** result for albums *********/}
                                <div>
                                    {state.result?.albums && (
                                        <div>
                                            <h4 className="search-result-label">Albums</h4>
                                            <div className="search-album-list">
                                                {state.result?.albums.map((album: any) => (
                                                    <div className="search-album">
                                                        <h4 className="album-name">{album.name}</h4>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="search-result-label">Recent Search</h4>
                                        {state.recentSearch && (
                                            <div>
                                                {state.recentSearch.map((search: any) => (
                                                    <div className="recent-search-keyword">
                                                        <li>{search}</li>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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
