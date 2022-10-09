import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import {
    AiFillSound,
    BsVolumeMute,
    CgHeart,
    CgPlayTrackNext,
    CgPlayTrackPrev,
    FaAngleUp,
    FaEllipsisV,
} from 'react-icons/all'

import useStore from '../../store/useStore'
import staticPath from '../../utils/staticPath'
import api, { backend, base } from '../../axios'
import { ACTION_TYPES, Song } from '../../store/types'
import { Link } from 'react-router-dom'
import GetScreenWidth from '../../hooks/GetScreenWidth'
import parseTime from '../../utils/parseTime'

const Player = (props: { screenWidth: number }) => {
    const [{ musicDetail, favorites, player }, dispatch] = useStore()

    let [music, setMusic] = useState<HTMLAudioElement>()

    let intervalRef = useRef<Number>()
    let volumeBarRef = useRef<HTMLDivElement>(null)

    let isMobile = props.screenWidth <= 600

    const [state, setState] = useState<{
        song: Song | null
        isPlaying: boolean
        mute: boolean
        duration: number
        volume: number
        pause: boolean
        currentTime: number
        loading: boolean
    }>({
        isPlaying: false,
        mute: false,
        duration: 0,
        volume: 0.5,
        pause: false,
        currentTime: 0,
        song: null,
        loading: false,
    })

    function progressInterval() {
        if (music) {
            intervalRef.current = setInterval(() => {
                if (music.duration <= music.currentTime) {
                    clearInterval(intervalRef.current as number)
                }

                setState((prevState) => {
                    return {
                        ...prevState,
                        currentTime: music.currentTime,
                    }
                })
            }, 1000)
        }
    }

    useEffect(() => {
        if (music && state.isPlaying) {
            progressInterval()
        }
        return () => clearInterval(intervalRef.current as number)
    }, [state.isPlaying])

    useEffect(() => {
        if (state.pause) {
            dispatch({
                type: ACTION_TYPES.SET_PLAYER_SLATS,
                payload: {
                    isPlay: false,
                },
            })
        } else if (state.isPlaying && !state.pause) {
            dispatch({
                type: ACTION_TYPES.SET_PLAYER_SLATS,
                payload: {
                    isPlay: true,
                },
            })
        }
    }, [state.pause])

    function initiateMusic() {
        if (musicDetail.url) {
            const musicDir = `${base}/songs/${musicDetail.url}`
            let newMusic = new Audio(musicDir)
            setMusic(newMusic)
            newMusic.play().then((_) => {
                setState({
                    ...state,
                    isPlaying: true,
                    pause: false,
                    duration: newMusic.duration,
                    currentTime: 0,
                })
            })
            return newMusic
        }
    }

    useEffect(() => {
        // music = document.createElement("audio")
        music?.pause()
        music?.remove()

        if (player && player.items.length) {
            let playSong = player.items[player.playIndex]
            if (playSong.url) {
                setState((prevState) => ({ ...prevState, loading: true }))
                const musicDir = audioURL(playSong.url)
                let newMusic = new Audio(musicDir)
                setMusic(newMusic)
                newMusic
                    .play()
                    .then((r) => {
                        newMusic.currentTime = 0
                        setState({
                            ...state,
                            song: playSong,
                            isPlaying: true,
                            duration: newMusic.duration,
                            pause: false,
                            loading: false,
                            currentTime: 0,
                        })
                    })
                    .catch((ex) => {
                        dispatch({
                            type: ACTION_TYPES.SET_ALERT_MESSAGE,
                            payload: ex.message,
                        })

                        setState({
                            ...state,
                            song: playSong,
                            isPlaying: false,
                            duration: 0,
                            pause: false,
                            currentTime: 0,
                        })
                    })
            }
        }
    }, [player])

    // handler next song
    function playNextSong() {
        let nextIndex = player.playIndex + 1
        if (nextIndex > player.items.length - 1) {
            nextIndex = 0
        }
        dispatch({
            type: ACTION_TYPES.SET_PREPARE_PLAYLIST,
            payload: {
                ...player,
                playIndex: nextIndex,
            },
        })
    }

    // handle previous song
    function playPrevSong() {
        let prevIndex = player.playIndex - 1
        if (prevIndex <= 0) {
            prevIndex = 0
        }
        dispatch({
            type: ACTION_TYPES.SET_PREPARE_PLAYLIST,
            payload: {
                ...player,
                playIndex: prevIndex,
            },
        })
    }

    // click music play icon to play
    function handlePlay() {
        if (!state.song) return
        let updateState = { ...state }

        if (!music) {
            initiateMusic()
        } else {
            music.play()
            updateState.currentTime = music.currentTime
        }

        clearInterval(intervalRef.current as number)
        progressInterval()
        updateState.isPlaying = true
        updateState.pause = false
        setState(updateState)
    }

    // toggle volume mute
    function toggleMute() {
        if (music) {
            music.muted = !state.mute
            setState({ ...state, mute: !state.mute })
        }
    }

    // handle pause music;
    function handlePause() {
        let updateState = { ...state }
        if (music) {
            clearInterval(intervalRef.current as number)
            updateState.pause = true
            music?.pause()
        }
        setState(updateState)
    }

    function addToFavorite(isAdd = false) {
        if (!musicDetail) return

        if (isAdd) {
            api.post('/api/v1/favorite', { songId: musicDetail.songId })
                .then((r) => {
                    console.log(r)
                })
                .catch((ex) => {
                    console.log(ex)
                })
        } else {
        }
    }
    const { song } = state

    const PlayCircle = ({ className }: { className: string }) => (
        <svg
            className={`play-icon ${className} ${song && song.url ? 'text-primary' : ''}`}
            onClick={handlePlay}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" />
        </svg>
    )

    const PlayCircleLoading = ({ className }: { className: string }) => (
        <div className={`play-loading ${className} ${song && song.url ? 'text-primary' : ''}`}></div>
    )

    const PlayPauseCircle = () => (
        <svg
            className={`pause-icon ${song && song.url ? 'text-primary' : ''}`}
            onClick={handlePause}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z" />
        </svg>
    )

    const time = parseTime(state.currentTime)

    function isFavorites(song?: Song) {
        if (song && song.songId) {
            return favorites.findIndex((f: any) => f.songId === song.songId) !== -1
        } else {
            return false
        }
    }

    function audioURL(name: string) {
        return `https://res.cloudinary.com/donw17hdr/video/upload/v1664272552/sound/${name}`
    }

    function progressWidth() {
        let percent = (state.currentTime / state.duration) * 100
        return percent + '%'
    }

    function seekPosition(e: any) {
        clearInterval(intervalRef.current as number)
        // console.log(px1 , state.duration)
        // 1200px = 5s
        // 1px    = 5/1200s/px
        // 600px   = (5/1200)*600s

        let onePx = state.duration / e.target.offsetWidth
        let s = onePx * e.pageX

        if (music) {
            music.currentTime = s
            setState({
                ...state,
                currentTime: s,
            })
            progressInterval()
        }
    }

    function volumeChangeHandler(e: any) {
        e.stopPropagation()

        if (!volumeBarRef.current) return

        let rect = volumeBarRef.current.getBoundingClientRect()
        let height = e.pageY - rect.top

        if (music) {
            music.volume = height / 100
        }

        setState({
            ...state,
            volume: height / 100,
        })
    }

    function getNextSong() {
        if (player && player.items) {
            return player.items[player.playIndex + 1]
        }
    }

    const nextSong = getNextSong()

    return (
        <div className={`player-container ${isMobile ? 'mobile-view' : ''}`}>
            <div className="player-root">
                <div onClick={seekPosition} className="seekbar">
                    <div className="seekbar_progress" style={{ width: progressWidth() }}></div>
                </div>

                <div className="player-root__items">
                    <div className="flex items-center  player-song-info">
                        <div className="song-thumb">
                            <img
                                src={staticPath(
                                    song
                                        ? song.cover
                                        : 'https://a10.gaanacdn.com/gn_img/albums/ZaP37RKDy7/P37OlNeX3D/size_m.webp'
                                )}
                                alt=""
                            />
                            <p className="song-title">{song ? song.title : 'select music'} </p>
                        </div>
                        {!isMobile && (
                            <div className="user-action flex items-center">
                                <CgHeart
                                    className={`fav-icon ${isFavorites(song) ? 'text-primary' : ''}`}
                                    onClick={() => addToFavorite(true)}
                                />
                                <FaEllipsisV />
                                <div className="play-time">
                                    {song ? (
                                        <div className="music-time">
                                            <span className="hour">{time.h}</span>
                                            <span className="mx-1">
                                                :
                                                <span className="min">{time.min < 10 ? '0' + time.min : time.min}</span>
                                            </span>
                                            <span className="mx-1">
                                                :
                                                <span className="second">
                                                    {time.second < 10 ? '0' + time.second : time.second}
                                                </span>
                                            </span>
                                            / {song?.duration}
                                            {/*{song && song?.duration.toString().includes(".") ? song.duration : song.duration + ":00"}*/}
                                        </div>
                                    ) : (
                                        '00/00.00'
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center player-control">
                        <li className={`flex items-center ${!state.isPlaying ? 'disable-icons' : ''}`}>
                            {!isMobile && <CgPlayTrackPrev onClick={playPrevSong} />}

                            {state.loading ? (
                                <PlayCircleLoading className="" />
                            ) : state.isPlaying && !state.pause ? (
                                <PlayPauseCircle />
                            ) : (
                                <PlayCircle className="" />
                            )}

                            {!isMobile && <CgPlayTrackNext onClick={playNextSong} />}
                        </li>
                    </div>

                    {!isMobile && (
                        <div>
                            <li className="relative">
                                {state.mute ? (
                                    <BsVolumeMute className="sound-icon" onClick={toggleMute} />
                                ) : (
                                    <AiFillSound className="sound-icon" onClick={toggleMute} />
                                )}

                                {/*<div className="volume-bar">*/}
                                {/*  <div className="range" ref={volumeBarRef} onClick={volumeChangeHandler} >*/}
                                {/*    <div className="current" style={{height: state.volume  + "px"}}></div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </li>
                        </div>
                    )}

                    <div className="next-song-label">
                        <li className="relative flex items-center">
                            {!isMobile && (
                                <div>
                                    <span>Up Next</span>
                                    <h4 className={`${nextSong ? '' : 'disable-text'}`}>
                                        {nextSong ? nextSong.title : 'No song next'}
                                    </h4>
                                </div>
                            )}
                            <Link to="/player">
                                <FaAngleUp />
                            </Link>
                            {/*<div className="volume-bar">*/}
                            {/*  <div className="range" ref={volumeBarRef} onClick={volumeChangeHandler} >*/}
                            {/*    <div className="current" style={{height: state.volume  + "px"}}></div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetScreenWidth(Player)
