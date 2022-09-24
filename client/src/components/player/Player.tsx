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
import api, {backend} from "../../axios";


const Player = () => {
  
  const [{musicDetail, player}, dispatch] = useStore();
  
  
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
    if(music) {
      intervalRef.current = setInterval(() => {
        if(music.duration <= music.currentTime){
          clearInterval(intervalRef.current)
        }
        setState((prevState) => {
          return {
            ...prevState,
            currentTime: music.currentTime
          }
        })
      }, 1000)
    }
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
        pause: false,
        currentTime: newMusic.currentTime
      })
      return newMusic
    }
  }
  
  
  // useEffect(()=>{
  //   if(musicDetail?.url) {
  //     if(!music) {
  //       initiateMusic()
  //     }
  //   }
  // }, [musicDetail])
  
  
  useEffect(()=>{
    if(player && player.items.length){
      let firstMusic = player.items[0];
      
      console.log(firstMusic)
      
      if(firstMusic.url) {
        const musicDir = `${backend}/songs/${firstMusic.url}`
        let newMusic = new Audio(musicDir);
        setMusic(newMusic)
        newMusic.play()
        setState({
          ...state,
          isPlaying: true,
          pause: false,
          currentTime: newMusic.currentTime
        })
      }
    }
  }, [player])
  
  
  // click music play icon to play
  function handlePlay(){
    if(!musicDetail) return;
    let updateState = {...state}
 
    if(!music) {
      initiateMusic()
    } else {
      music.play()
      updateState.currentTime = music.currentTime;
    }
    
    clearInterval(intervalRef.current);
    progressInterval();
    
    updateState.isPlaying = true
    updateState.pause = false
    setState(updateState)
  }
  
  function parseTime(count: number){
    let h = 0;
    let min = 0;
    let second = 0
    let remain = 0;
    
    if(count >= 3600){
  
      h = count / 3600;
      remain = count % 3600;
      
      if(remain > 60){
        // remain minutes
        min = remain / 60
        // remain second
        remain = remain % 60;
        second = remain;
      } else {
        second = remain;
      }
      
    } else if(count >= 60){
      // remain minutes
      min = count / 60
      // remain second
      remain = remain % 60;
      second = remain;
    } else {
      second = count;
    }
    return {
      second: Math.round(second),
      min: Math.round(min),
      h
    }
  }
  
  
  // toggle volume mute
  function toggleMute(){
    if(music) {
      music.muted = !state.mute;
      setState({...state, mute: !state.mute})
    }
  }
  
  // handle pause music;
  function handlePause(){
    let updateState = {...state}
    if(music) {
      clearInterval(intervalRef.current);
      updateState.pause = true
      music?.pause();
    }
    setState(updateState)
  }

  function addToFavorite(isAdd=false){
    if(!musicDetail) return;
    
    if(isAdd){
      api.post("/api/v1/favorite", {songId: musicDetail.songId}).then(r =>{
        console.log(r)
      }).catch(ex=>{
        console.log(ex)
      })
      
    } else {
    
    }
  }
  
  const PlayCircle = ()=> <svg
  
      className={`play-icon ${(musicDetail && musicDetail.url) ? "text-primary" : "" }`}
                               onClick={handlePlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"/></svg>
  
  const PlayPauseCircle = ()=> <svg
      className={`pause-icon ${(musicDetail && musicDetail.url) ? "text-primary" : "" }`}
      onClick={handlePause}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"/></svg>
  
  const time = parseTime(state.currentTime)
    
  return (
    <div className="player-container">
      <div className="player-root">
        <div className="flex items-center  player-song-info">
          <div className="song-thumb">
            <img src={staticPath(musicDetail ? musicDetail.cover : "https://a10.gaanacdn.com/gn_img/albums/ZaP37RKDy7/P37OlNeX3D/size_m.webp")}/>
            <p className="song-title">{ musicDetail ? musicDetail.title : "select music" } </p>
          </div>
          <div className="user-action flex items-center">
            <CgHeart className="fav-icon" onClick={()=> addToFavorite(true) } />
            <FaEllipsisV />
            <div className="play-time">{musicDetail ?  (
                <div className="music-time">
         
                    <span className="hour">{time.h}</span>
                  
                    <span className="mx-1">:
                      <span className="min">{time.min < 10 ? "0"+time.min : time.min}</span>
                    </span>
                  <span  className="mx-1">:
                      <span className="second">{time.second < 10 ? "0"+time.second : time.second}</span>
                    </span>
                    /
                  {musicDetail.duration.toString().includes(".") ? musicDetail.duration : musicDetail.duration + ":00"}
                </div>
            ) : "00/00.00"}</div>
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
