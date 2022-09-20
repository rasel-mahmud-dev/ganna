import React from "react";

import "./style.scss";
import {
  AiFillSound, BiHeart,
  BiPlay, CgHeart,
  CgPlayTrackNext,
  CgPlayTrackPrev, FaEllipsisH, FaEllipsisV,
} from "react-icons/all";

const Player = () => {
  return (
    <div className="player-container">
      <div className="player-root">
        
        <div className="flex items-center  player-song-info">
          <div className="song-thumb">
            <img src="https://a10.gaanacdn.com/gn_img/albums/ZaP37RKDy7/P37OlNeX3D/size_m.webp" />
            <p className="song-title">Pani Pani ho</p>
          </div>
          <div className="user-action items-center">
            <CgHeart />
            <FaEllipsisV />
            <div className="play-time">03/4.00</div>
          </div>
         
          
        </div>
        
        <div className="flex items-center player-control">
         
          <li>
            <CgPlayTrackPrev />
            <BiPlay />
            <CgPlayTrackNext />
          </li>
        </div>
        
        <div>
          <li>
            <AiFillSound className="sound-icon" />
          </li>
        </div>
      </div>
    </div>
  );
};

export default Player;
