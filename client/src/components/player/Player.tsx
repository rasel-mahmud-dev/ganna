import React, {useEffect, useRef, useState} from "react";

import "./style.scss";
import {
  AiFillSound,
  BsVolumeMute,
  CgHeart,
  CgPlayTrackNext,
  CgPlayTrackPrev,
  FaEllipsisV,
} from "react-icons/all";


import useStore from "../../store/useStore";
import staticPath from "../../utils/staticPath";
import {backend} from "../../axios";


const Player = () => {
  
  const [{musicDetail}, dispatch] = useStore();
  
  const [music, setMusic] = useState<HTMLAudioElement>()
  
  let intervalRef = useRef()
  
  
  const [state, setState] = useState({
    isPlaying: false,
    mute: false,
    volume: 1,
    pause: false,
    currentTime: 0
  })
  
  function progressInterval(){
    intervalRef.current =  setInterval(() => {
      setState({
        ...state,
        currentTime: music.currentTime
      
      })
    }, 1000)
  }
  
  useEffect(()=>{
    if(music && state.isPlaying) {
      progressInterval()
    }
    return ()=> clearInterval(intervalRef.current)
    
  }, [state.isPlaying])
  
  
  function initiateMusic(){
    if(musicDetail.url) {
      const musicDir = `${backend}/songs/${musicDetail.url}`
      let newMusic = new Audio(musicDir);
      setMusic(newMusic)
      newMusic.play()
      setState({
        ...state,
        isPlaying: true,
        pause: false
      })
      return newMusic
    }
  }
  
  useEffect(()=>{
    if(musicDetail?.url) {
      if(!music) {
        initiateMusic()
      }
    }
  }, [musicDetail])

  
  
  function handlePlay(){
    if(!musicDetail) return;
    let updateState = {...state}
 
    if(!music) {
  
      let newMusic = initiateMusic()
      if(newMusic) {
        updateState.currentTime = newMusic.currentTime;
      }
   
    } else {
      music.play()
      updateState.currentTime = music.currentTime;
    }
  
    updateState.isPlaying = true
    updateState.pause = false
    setState(updateState)
  }
  
  
  function toggleMute(){
    music.muted = !state.mute;
    setState({...state, mute: !state.mute})
  }
  
  function togglePause(){
    if(state.pause){
      music?.play();
    } else {
      clearInterval(intervalRef.current);
      music?.pause();
    }
    setState({...state, pause: !state.pause})
  }

  const PlayCircle = ()=> <svg
      style={{width: '25'}}
      className={`${(musicDetail && musicDetail.url) ? "text-primary" : "" }`}
                               onClick={handlePlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"/></svg>
  
  
  const PlayPauseCircle = ()=> <svg
      style={{width: '25'}}
      className={`${(musicDetail && musicDetail.url) ? "text-primary" : "" }`}
      onClick={togglePause}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"/></svg>
  
    
  return (
    <div className="player-container">
      <div className="player-root">
        <div className="flex items-center  player-song-info">
          <div className="song-thumb">
            <img src={staticPath(musicDetail ? musicDetail.cover : "https://a10.gaanacdn.com/gn_img/albums/ZaP37RKDy7/P37OlNeX3D/size_m.webp")}/>
            <p className="song-title">{ musicDetail ? musicDetail.title : "select music" } </p>
          </div>
          <div className="user-action flex items-center">
            <CgHeart />
            <FaEllipsisV />
            <div className="play-time">{musicDetail ?  `${state.currentTime}/${musicDetail.duration}` : "00/00.00"}</div>
          </div>
        </div>

        <div className="flex items-center player-control">
          <li>
            <CgPlayTrackPrev />
            { (state.isPlaying && !state.pause)  ? (
                <PlayPauseCircle />
            ) : (
              <PlayCircle />
            ) }
            <CgPlayTrackNext />
          </li>
        </div>

        <div>
          <li>
            { state.mute ? (
                <BsVolumeMute className="sound-icon" onClick={toggleMute} />
                ) : (
              <AiFillSound className="sound-icon" onClick={toggleMute} />
              ) }
          </li>
        </div>
      </div>
    </div>
  );
};

export default Player;
