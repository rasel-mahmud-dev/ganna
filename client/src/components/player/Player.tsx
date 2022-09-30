import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'

import './style.scss'
import { AiFillSound, BsVolumeMute, CgHeart, CgPlayTrackNext, CgPlayTrackPrev, FaEllipsisV } from 'react-icons/all'

import useStore from '../../store/useStore'
import staticPath from '../../utils/staticPath'
import api, { backend } from '../../axios'
import { ACTION_TYPES } from '../../store/types'

const Player = () => {
    const [{ musicDetail, favorites, player }, dispatch] = useStore()

    let [music, setMusic] = useState<HTMLAudioElement>()

    let intervalRef = useRef()
    let volumeBarRef = useRef<HTMLDivElement>(null)

    const [state, setState] = useState({
        isPlaying: false,
        mute: false,
        duration: 0,
        volume: 0.5,
        pause: false,
        currentTime: 0,
        song: {},
    })

    function progressInterval() {
        if (music) {
            intervalRef.current = setInterval(() => {
                if (music.duration <= music.currentTime) {
                    clearInterval(intervalRef.current)
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
        return () => clearInterval(intervalRef.current)
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
            const musicDir = `${backend}/songs/${musicDetail.url}`
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
                const musicDir = `${backend}/songs/${playSong.url}`
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

        clearInterval(intervalRef.current)
        progressInterval()
        updateState.isPlaying = true
        updateState.pause = false
        setState(updateState)
    }

    function parseTime(count: number) {
        let h = 0
        let min = 0
        let second = 0
        let remain = 0

        if (count >= 3600) {
            h = count / 3600
            remain = count % 3600

            if (remain > 60) {
                // remain minutes
                min = remain / 60
                // remain second
                remain = remain % 60
                second = remain
            } else {
                second = remain
            }
        } else if (count >= 60) {
            // remain minutes
            min = count / 60
            // remain second
            remain = remain % 60
            second = remain
        } else {
            second = count
        }
        return {
            second: Math.round(second),
            min: Math.round(min),
            h,
        }
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
            clearInterval(intervalRef.current)
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

    const PlayCircle = () => (
        <svg
            className={`play-icon ${song && song.url ? 'text-primary' : ''}`}
            onClick={handlePlay}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" />
        </svg>
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

    function isFavorites(songId: string) {
        return favorites.findIndex((f: any) => f.songId === songId) !== -1
    }

    function progressWidth() {
        let percent = (state.currentTime / state.duration) * 100
        return percent + '%'
    }

    function seekPosition(e: any) {
        clearInterval(intervalRef.current)
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

    function volumeChangeHandler(e) {
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

    return (
        <div className="player-container">
            <div className="player-root">
                <div onClick={seekPosition} className="seekbar">
                    <div className="seekbar_progress" style={{ width: progressWidth() }}></div>
                </div>

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
                    <div className="user-action flex items-center">
                        <CgHeart
                            className={`fav-icon ${isFavorites(song.songId) ? 'text-primary' : ''}`}
                            onClick={() => addToFavorite(true)}
                        />
                        <FaEllipsisV />
                        <div className="play-time">
                            {song ? (
                                <div className="music-time">
                                    <span className="hour">{time.h}</span>
                                    <span className="mx-1">
                                        :<span className="min">{time.min < 10 ? '0' + time.min : time.min}</span>
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
                </div>

                <div className="flex items-center player-control">
                    <li>
                        <CgPlayTrackPrev onClick={playPrevSong} />
                        {state.isPlaying && !state.pause ? <PlayPauseCircle /> : <PlayCircle />}
                        <CgPlayTrackNext onClick={playNextSong} />
                    </li>
                </div>

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
            </div>
        </div>
    )
}

export default Player
